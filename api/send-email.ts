import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, country, service, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields: name, email" });
  }

  const GMAIL_USER = (process.env.GMAIL_USER || "").trim();
  const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "").trim();

  // Debug logging — logs partial credentials to verify env vars are loaded
  console.log("[Email API] GMAIL_USER loaded:", GMAIL_USER ? `${GMAIL_USER.substring(0, 4)}***` : "EMPTY");
  console.log("[Email API] GMAIL_APP_PASSWORD loaded:", GMAIL_APP_PASSWORD ? `${GMAIL_APP_PASSWORD.length} chars, starts with '${GMAIL_APP_PASSWORD.substring(0, 3)}...'` : "EMPTY");

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  // Create transporter using nodemailer's built-in Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const currentYear = new Date().getFullYear();
  const firstName = name.split(" ")[0];
  const serviceName = service || "General Inquiry";
  const refId = `BBS-${Date.now().toString(36).toUpperCase()}`;
  const submittedDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  // Build the professional HTML email
  const htmlEmail = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Enquiry Received - Brand Brick Studio</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { margin: 0; padding: 0; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 24px !important; padding-right: 24px !important; }
      .mobile-center { text-align: center !important; }
      .detail-label { width: 90px !important; font-size: 10px !important; }
      .detail-value { font-size: 13px !important; }
      .hero-title { font-size: 24px !important; }
      .hero-sub { font-size: 13px !important; }
      .step-title { font-size: 13px !important; }
      .step-desc { font-size: 12px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Inter','Helvetica Neue',Arial,sans-serif; -webkit-font-smoothing:antialiased;">

  <!-- Preheader text (hidden, helps inbox preview) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    Thank you for reaching out to Brand Brick Studio. We have received your enquiry and a representative will contact you shortly.
  </div>

  <!-- Background Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f5f5f5;">
    <tr>
      <td style="padding: 32px 10px;">

        <!-- Main Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" class="email-container" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.05);">

          <!-- ===== TOP ACCENT BAR ===== -->
          <tr>
            <td style="height:4px; background: linear-gradient(90deg, #dc2626 0%, #b91c1c 40%, #1a1a1a 100%);"></td>
          </tr>

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="padding: 32px 44px 24px 44px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <!-- Brand -->
                  <td style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:11px; height:11px; background-color:#dc2626; border-radius:3px;"></td>
                        <td style="width:8px;"></td>
                        <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:16px; font-weight:800; color:#0a0a0a; letter-spacing:-0.3px;">Brand Brick Studio</td>
                      </tr>
                    </table>
                  </td>
                  <!-- Reference Badge -->
                  <td style="vertical-align: middle; text-align: right;">
                    <span style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:600; color:#9ca3af; background-color:#f5f5f5; padding:5px 10px; border-radius:6px; letter-spacing:0.5px;">${refId}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== DIVIDER ===== -->
          <tr>
            <td style="padding: 0 44px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td style="height:1px; background-color:#f0f0f0;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- ===== HERO SECTION ===== -->
          <tr>
            <td style="padding: 40px 44px 32px 44px;" class="mobile-padding">
              <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:500; color:#dc2626; letter-spacing:1.5px; text-transform:uppercase; margin:0 0 12px 0;">Enquiry Received</p>
              <h1 class="hero-title" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:28px; font-weight:800; color:#0a0a0a; line-height:1.25; margin:0 0 16px 0; letter-spacing:-0.5px;">
                Hello ${firstName},<br>thank you for reaching out.
              </h1>
              <p class="hero-sub" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:400; color:#6b7280; line-height:1.65; margin:0;">
                We have received your enquiry and it has been assigned to our team. A dedicated representative will review your requirements and get back to you within <strong style="color:#374151;">24 hours</strong>.
              </p>
            </td>
          </tr>

          <!-- ===== STATUS BANNER ===== -->
          <tr>
            <td style="padding: 0 44px 32px 44px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8faf8; border:1px solid #e2e8e0; border-radius:10px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:32px; vertical-align:middle;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:28px; height:28px; background-color:#22c55e; border-radius:50%; text-align:center; vertical-align:middle; font-size:14px; color:#ffffff; line-height:28px;">&#10003;</td>
                            </tr>
                          </table>
                        </td>
                        <td style="padding-left:12px; vertical-align:middle;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#15803d; margin:0;">Successfully logged</p>
                        </td>
                        <td style="text-align:right; vertical-align:middle;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:500; color:#9ca3af; margin:0;">${submittedDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== YOUR ENQUIRY DETAILS ===== -->
          <tr>
            <td style="padding: 0 44px 32px 44px;" class="mobile-padding">
              <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:700; color:#9ca3af; letter-spacing:2px; text-transform:uppercase; margin:0 0 14px 0;">Enquiry Summary</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
                <!-- Name -->
                <tr>
                  <td style="padding: 13px 18px; border-bottom:1px solid #f3f4f6; background-color:#fafafa;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Name</td>
                        <td class="detail-value" style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#111827;">${name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Email -->
                <tr>
                  <td style="padding: 13px 18px; border-bottom:1px solid #f3f4f6;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Email</td>
                        <td class="detail-value" style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#111827;">${email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${phone ? `
                <!-- Phone -->
                <tr>
                  <td style="padding: 13px 18px; border-bottom:1px solid #f3f4f6; background-color:#fafafa;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Phone</td>
                        <td class="detail-value" style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#111827;">${phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}
                ${country ? `
                <!-- Country -->
                <tr>
                  <td style="padding: 13px 18px; border-bottom:1px solid #f3f4f6;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Country</td>
                        <td class="detail-value" style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#111827;">${country}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}
                <!-- Service -->
                <tr>
                  <td style="padding: 13px 18px; border-bottom:1px solid #f3f4f6; background-color:#fafafa;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Service</td>
                        <td class="detail-value" style="vertical-align:top;">
                          <span style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:700; color:#dc2626; background-color:#fef2f2; padding:4px 10px; border-radius:5px; display:inline-block; letter-spacing:0.3px;">${serviceName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Message -->
                <tr>
                  <td style="padding: 13px 18px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:110px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px; padding-top:2px;">Message</td>
                        <td class="detail-value" style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:400; color:#374151; line-height:1.65;">${message || "—"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== PROCESS TIMELINE ===== -->
          <tr>
            <td style="padding: 0 44px 36px 44px;" class="mobile-padding">
              <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:700; color:#9ca3af; letter-spacing:2px; text-transform:uppercase; margin:0 0 16px 0;">What Happens Next</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <!-- Step 1 -->
                <tr>
                  <td style="padding-bottom:6px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:32px; height:32px; background-color:#0a0a0a; border-radius:8px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:12px; font-weight:800; color:#ffffff; line-height:32px;">01</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:14px;">
                          <p class="step-title" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#111827; margin:0 0 3px 0;">Requirement Analysis</p>
                          <p class="step-desc" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:400; color:#9ca3af; line-height:1.5; margin:0;">Our team carefully evaluates your project scope, objectives, and deliverables.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Connector -->
                <tr><td style="padding: 0 0 6px 15px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="width:1px; height:14px; background-color:#e5e7eb;"></td></tr></table></td></tr>
                <!-- Step 2 -->
                <tr>
                  <td style="padding-bottom:6px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:32px; height:32px; background-color:#0a0a0a; border-radius:8px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:12px; font-weight:800; color:#ffffff; line-height:32px;">02</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:14px;">
                          <p class="step-title" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#111827; margin:0 0 3px 0;">Consultation Call</p>
                          <p class="step-desc" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:400; color:#9ca3af; line-height:1.5; margin:0;">A dedicated representative connects with you to understand your vision in detail.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Connector -->
                <tr><td style="padding: 0 0 6px 15px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="width:1px; height:14px; background-color:#e5e7eb;"></td></tr></table></td></tr>
                <!-- Step 3 -->
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:32px; height:32px; background-color:#dc2626; border-radius:8px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:12px; font-weight:800; color:#ffffff; line-height:32px;">03</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:14px;">
                          <p class="step-title" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#111827; margin:0 0 3px 0;">Tailored Proposal</p>
                          <p class="step-desc" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:400; color:#9ca3af; line-height:1.5; margin:0;">We present a customised strategy and proposal crafted specifically for your brand.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== CTA ===== -->
          <tr>
            <td style="padding: 0 44px 36px 44px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fafafa; border:1px solid #e5e7eb; border-radius:10px;">
                <tr>
                  <td style="padding: 24px 28px; text-align:center;">
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#111827; margin:0 0 4px 0;">
                      Need immediate assistance?
                    </p>
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:400; color:#9ca3af; margin:0 0 18px 0;">
                      Reply directly to this email — our team monitors responses in real time.
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td>
                          <a href="mailto:brandbrickstudio@gmail.com" style="display:inline-block; background-color:#0a0a0a; color:#ffffff; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:700; text-decoration:none; padding:11px 28px; border-radius:7px; letter-spacing:0.3px;">
                            Contact Us Directly
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="padding: 0 44px 32px 44px;" class="mobile-padding">
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:20px;">
                <tr><td style="height:1px; background-color:#f0f0f0;"></td></tr>
              </table>
              <!-- Footer Content -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:7px; height:7px; background-color:#dc2626; border-radius:2px;"></td>
                        <td style="width:6px;"></td>
                        <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:700; color:#111827;">Brand Brick Studio</td>
                      </tr>
                    </table>
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:500; color:#9ca3af; margin:4px 0 0 0; letter-spacing:1px; text-transform:uppercase;">Creative &bull; Content &bull; Code</p>
                  </td>
                  <td style="text-align:right; vertical-align:middle;">
                    <a href="https://brandbrickstudio.in" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#dc2626; text-decoration:none;">brandbrickstudio.in</a>
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:400; color:#d1d5db; margin:4px 0 0 0;">&copy; ${currentYear} All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End Main Container -->

      </td>
    </tr>
  </table>
  <!-- End Background Wrapper -->

</body>
</html>
`;

  // Build plain text version for deliverability
  const textEmail = `BRAND BRICK STUDIO — Enquiry Received
Reference: ${refId}
Date: ${submittedDate}

Hello ${firstName},

Thank you for reaching out to Brand Brick Studio. We have received your enquiry and it has been assigned to our team. A dedicated representative will review your requirements and get back to you within 24 hours.

ENQUIRY SUMMARY
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ""}
${country ? `- Country: ${country}` : ""}
- Service: ${serviceName}
- Message: ${message || "—"}

WHAT HAPPENS NEXT
01 — Requirement Analysis: Our team evaluates your project scope and objectives.
02 — Consultation Call: A representative connects with you to discuss your vision.
03 — Tailored Proposal: We present a customised strategy crafted for your brand.

Need immediate assistance? Reply directly to this email.

—
Brand Brick Studio
Creative. Content. Code.
© ${currentYear} All rights reserved.
https://brandbrickstudio.in
`;

  try {
    await transporter.sendMail({
      from: {
        name: "Brand Brick Studio",
        address: GMAIL_USER,
      },
      replyTo: GMAIL_USER,
      to: email,
      subject: `Enquiry Received — Ref ${refId} | Brand Brick Studio`,
      text: textEmail,
      html: htmlEmail,
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Brand Brick Studio",
        "List-Unsubscribe": `<mailto:${GMAIL_USER}?subject=unsubscribe>`,
      },
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}

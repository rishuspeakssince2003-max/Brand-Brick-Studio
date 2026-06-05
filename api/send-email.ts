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

  // Build the beautiful HTML email
  const htmlEmail = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Thank You for Your Enquiry - Brand Brick Studio</title>
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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * { margin: 0; padding: 0; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-center { text-align: center !important; }
      .detail-label { width: 100px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f0f0f0; font-family:'Inter','Helvetica Neue',Arial,sans-serif; -webkit-font-smoothing:antialiased;">

  <!-- Background Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0f0f0;">
    <tr>
      <td style="padding: 40px 10px;">

        <!-- Main Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="580" class="email-container" style="max-width:580px; margin:auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- ===== HERO HEADER ===== -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%); padding: 48px 40px 40px 40px; text-align: center;" class="mobile-padding">
              
              <!-- Brand Name -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="width:10px; height:10px; background-color:#dc2626; border-radius:3px;"></td>
                        <td style="width:8px;"></td>
                        <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:22px; font-weight:800; color:#ffffff; letter-spacing:-0.5px;">
                          Brand Brick Studio
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#666666; letter-spacing:3px; text-transform:uppercase;">
                    Creative &bull; Content &bull; Code
                  </td>
                </tr>
              </table>

              <!-- Divider Line -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 32px auto 28px auto;">
                <tr>
                  <td style="width:60px; height:1px; background-color:#333333;"></td>
                  <td style="width:12px;"></td>
                  <td style="width:8px; height:8px; background-color:#dc2626; border-radius:50%;"></td>
                  <td style="width:12px;"></td>
                  <td style="width:60px; height:1px; background-color:#333333;"></td>
                </tr>
              </table>

              <!-- Welcome Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:28px; font-weight:700; color:#ffffff; line-height:1.3; padding-bottom:12px;">
                    Thank You, ${firstName}!
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:400; color:#a0a0a0; line-height:1.6;">
                    We've received your enquiry and our team is already on it.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== CONFIRMATION BADGE ===== -->
          <tr>
            <td style="padding: 36px 40px 0 40px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px;">
                <tr>
                  <td style="padding: 18px 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align:middle; padding-right: 14px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:36px; height:36px; background-color:#22c55e; border-radius:50%; text-align:center; vertical-align:middle; font-size:18px; color:#ffffff;">
                                &#10003;
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:middle;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:700; color:#15803d; margin:0 0 2px 0;">Enquiry Confirmed</p>
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:400; color:#16a34a; margin:0;">Your request has been logged successfully in our system.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== WHAT HAPPENS NEXT ===== -->
          <tr>
            <td style="padding: 32px 40px 0 40px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:700; color:#dc2626; letter-spacing:2px; text-transform:uppercase; padding-bottom:16px;">
                    What Happens Next
                  </td>
                </tr>
              </table>

              <!-- Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <!-- Step 1 -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:44px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:36px; height:36px; background-color:#fef2f2; border:1px solid #fecaca; border-radius:10px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:14px; font-weight:800; color:#dc2626;">
                                1
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:12px;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; margin:0 0 3px 0;">Review &amp; Research</p>
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:400; color:#6b7280; line-height:1.5; margin:0;">Our team will carefully review your project requirements and conduct any necessary research.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 2 -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:44px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:36px; height:36px; background-color:#fef2f2; border:1px solid #fecaca; border-radius:10px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:14px; font-weight:800; color:#dc2626;">
                                2
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:12px;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; margin:0 0 3px 0;">Personal Outreach</p>
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:400; color:#6b7280; line-height:1.5; margin:0;">A dedicated representative will reach out to you within 24 hours to discuss your goals.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 3 -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width:44px; vertical-align:top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width:36px; height:36px; background-color:#fef2f2; border:1px solid #fecaca; border-radius:10px; text-align:center; vertical-align:middle; font-family:'Inter',sans-serif; font-size:14px; font-weight:800; color:#dc2626;">
                                3
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:top; padding-left:12px;">
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; margin:0 0 3px 0;">Custom Strategy</p>
                          <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:400; color:#6b7280; line-height:1.5; margin:0;">We'll present a tailored strategy designed specifically for your brand's success.</p>
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
            <td style="padding: 32px 40px 0 40px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:700; color:#dc2626; letter-spacing:2px; text-transform:uppercase; padding-bottom:16px;">
                    Your Enquiry Details
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#fafafa; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
                <!-- Name -->
                <tr>
                  <td style="padding: 14px 20px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Name</td>
                        <td style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a;">${name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Email -->
                <tr>
                  <td style="padding: 14px 20px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Email</td>
                        <td style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#1a1a1a;">${email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${phone ? `
                <!-- Phone -->
                <tr>
                  <td style="padding: 14px 20px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Phone</td>
                        <td style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#1a1a1a;">${phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}
                ${country ? `
                <!-- Country -->
                <tr>
                  <td style="padding: 14px 20px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Country</td>
                        <td style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:500; color:#1a1a1a;">${country}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}
                <!-- Service -->
                <tr>
                  <td style="padding: 14px 20px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Service</td>
                        <td style="vertical-align:top;">
                          <span style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:700; color:#dc2626; background-color:#fef2f2; padding:4px 12px; border-radius:6px; display:inline-block;">${serviceName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Message -->
                <tr>
                  <td style="padding: 14px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td class="detail-label" style="width:120px; vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px;">Message</td>
                        <td style="vertical-align:top; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:400; color:#374151; line-height:1.6;">${message || "No message provided"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== CTA SECTION ===== -->
          <tr>
            <td style="padding: 36px 40px 0 40px; text-align:center;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color:#0a0a0a; border-radius:12px; width:100%;">
                <tr>
                  <td style="padding: 28px 32px; text-align:center;">
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:600; color:#ffffff; margin:0 0 6px 0;">
                      Need to reach us sooner?
                    </p>
                    <p style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:400; color:#a0a0a0; margin:0 0 20px 0;">
                      Reply directly to this email or reach out on our channels below.
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td>
                          <a href="mailto:brandbrickstudio@gmail.com" style="display:inline-block; background-color:#dc2626; color:#ffffff; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:700; text-decoration:none; padding:12px 28px; border-radius:8px; letter-spacing:0.5px;">
                            Reply to Us
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
            <td style="padding: 36px 40px 40px 40px; text-align:center;" class="mobile-padding">
              
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom:20px;">
                <tr>
                  <td style="width:200px; height:1px; background-color:#e5e7eb;"></td>
                </tr>
              </table>

              <!-- Brand Footer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="padding-bottom:8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="width:8px; height:8px; background-color:#dc2626; border-radius:2px;"></td>
                        <td style="width:6px;"></td>
                        <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:700; color:#1a1a1a;">
                          Brand Brick Studio
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:400; color:#9ca3af; line-height:1.6; padding-bottom: 6px;">
                    Creative. Content. Code.
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:400; color:#9ca3af; line-height:1.6;">
                    &copy; ${currentYear} Brand Brick Studio. All rights reserved.
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <a href="https://brandbrickstudio.in" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:600; color:#dc2626; text-decoration:none;">
                      brandbrickstudio.in
                    </a>
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
  const textEmail = `
Thank You, ${firstName}!

We've received your enquiry and our team is already on it.

WHAT HAPPENS NEXT:
1. Review & Research - Our team will carefully review your project requirements.
2. Personal Outreach - A dedicated representative will reach out within 24 hours.
3. Custom Strategy - We'll present a tailored strategy for your brand.

YOUR ENQUIRY DETAILS:
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ""}
${country ? `- Country: ${country}` : ""}
- Service: ${serviceName}
- Message: ${message || "No message provided"}

Need to reach us sooner? Reply directly to this email.

---
Brand Brick Studio
Creative. Content. Code.
© ${currentYear} Brand Brick Studio. All rights reserved.
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
      subject: `Thank you for your enquiry, ${firstName}! — Brand Brick Studio`,
      text: textEmail,
      html: htmlEmail,
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Brand Brick Studio Mailer",
        "List-Unsubscribe": `<mailto:${GMAIL_USER}?subject=unsubscribe>`,
      },
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}

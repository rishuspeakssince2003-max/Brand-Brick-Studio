import React from 'react';
import { Layers, ThumbsUp, Cpu, Mail } from 'lucide-react';

interface MenuBarProps {
  activeSection: string;
}

const icons = {
  services: <Layers size={18} className="shrink-0" />,
  "why-us": <ThumbsUp size={18} className="shrink-0" />,
  stack: <Cpu size={18} className="shrink-0" />,
  contact: <Mail size={18} className="shrink-0" />,
};

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, active, href }) => {
  const [hovered, setHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Calculate width based on label length (min 40px for icon, plus label)
  const expandedWidth = Math.max(40 + label.length * 8 + 24, 110); // 8px per char + 24px padding

  // Responsive: hide text and keep button compact on small screens
  const isExpanded = (hovered || active);

  // Show tooltip on mobile tap
  const handleMobileTooltip = (e: React.MouseEvent) => {
    if (window.innerWidth < 640) {
      setShowTooltip(true);
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
      tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 1200);
    }
  };

  React.useEffect(() => () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  }, []);

  return (
    <a
      href={href}
      aria-label={label}
      className={`flex items-center rounded-xl border transition-all duration-300 focus:outline-none relative overflow-visible
        ${active 
          ? 'border-[#dc2626] bg-[#dc2626] text-white font-semibold shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
          : 'border-transparent text-zinc-400 hover:text-white hover:bg-[#dc2626]/10 hover:border-[#dc2626]/30'
        }
        w-10 sm:w-auto
        px-0 sm:px-3.5
        justify-center sm:justify-start
      `}
      style={{
        minWidth: 40,
        minHeight: 40,
        paddingTop: 6,
        paddingBottom: 6,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleMobileTooltip}
    >
      {/* Tooltip for mobile view */}
      <span
        className={`sm:hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap
          ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </span>
      <span className="flex items-center justify-center w-10 h-10 shrink-0">
        {icon}
      </span>
      <span
        className={`text-xs md:text-sm transition-all duration-300 whitespace-nowrap pointer-events-none ml-1.5
          hidden sm:inline-block
          ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
        style={{
          transition: 'opacity 0.25s, width 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.25s',
          width: isExpanded ? expandedWidth - 40 - 24 : 0,
        }}
      >
        {label}
      </span>
    </a>
  );
};

export const MenuBar = ({ activeSection }: MenuBarProps) => {
  return (
    <nav className="flex items-center gap-1 bg-[#0a0a0a]/60 backdrop-blur-md p-1 rounded-2xl border border-zinc-800/80 w-fit mx-auto transition-all duration-300">
      <IconButton icon={icons.services} label="Services" active={activeSection === 'services'} href="#services" />
      <IconButton icon={icons["why-us"]} label="Why Us" active={activeSection === 'why-us'} href="#why-us" />
      <IconButton icon={icons.stack} label="Our Tools" active={activeSection === 'stack'} href="#stack" />
      <IconButton icon={icons.contact} label="Contact" active={activeSection === 'contact'} href="#contact" />
    </nav>
  );
};

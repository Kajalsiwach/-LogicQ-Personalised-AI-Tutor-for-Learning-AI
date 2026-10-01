import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dual-tone split brain / synaptic emblem inspired by reference */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(232,165,184,0.35)]"
        >
          {/* Left Hemisphere: Cyan / Electric Blue */}
          <path
            d="M17 6.5C12.5 6.5 9 10 9 14.5C9 16 9.5 17.5 10.5 18.5C9 19.8 8 21.8 8 24C8 27.5 10.8 30.5 14.5 30.5C15.4 30.5 16.2 30.3 17 30V6.5Z"
            fill="url(#leftBrainGrad)"
          />
          {/* Left Hemisphere Synapse Details */}
          <circle cx="13" cy="13" r="1.5" fill="#E0F2FE" />
          <circle cx="12" cy="22" r="1.5" fill="#BAE6FD" />
          <path d="M13 14.5V20.5" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Hemisphere: Blush Pink / Coral */}
          <path
            d="M19 6.5C23.5 6.5 27 10 27 14.5C27 16 26.5 17.5 25.5 18.5C27 19.8 28 21.8 28 24C28 27.5 25.2 30.5 21.5 30.5C20.6 30.5 19.8 30.3 19 30V6.5Z"
            fill="url(#rightBrainGrad)"
          />
          {/* Right Hemisphere Synapse Details */}
          <circle cx="23" cy="13" r="1.5" fill="#FFE4E6" />
          <circle cx="24" cy="22" r="1.5" fill="#FBCFE8" />
          <path d="M23 14.5V20.5" stroke="#FBCFE8" strokeWidth="1.2" strokeLinecap="round" />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="leftBrainGrad" x1="8" y1="6.5" x2="17" y2="30.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="rightBrainGrad" x1="19" y1="6.5" x2="28" y2="30.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F472B6" />
              <stop offset="1" stopColor="#E11D48" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-heading font-extrabold text-xl tracking-wider text-slate-100 uppercase">
            LOGIQ
          </span>
        </div>
      )}
    </div>
  );
};

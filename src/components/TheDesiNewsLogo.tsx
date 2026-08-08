import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const TheDesiNewsLogo: React.FC<LogoProps> = ({ size = 'md', className = '', onClick }) => {
  const containerPadding = {
    sm: 'p-1.5 px-3',
    md: 'p-2 px-4 sm:px-5',
    lg: 'p-3 px-6'
  };

  const topTextSize = {
    sm: 'text-[11px]',
    md: 'text-[13px] sm:text-[15px]',
    lg: 'text-[16px] sm:text-[18px]'
  };

  const newsTextSize = {
    sm: 'text-[22px]',
    md: 'text-[28px] sm:text-[34px]',
    lg: 'text-[36px] sm:text-[44px]'
  };

  const globeSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-7 h-7'
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-[#990000] hover:bg-[#800000] text-white transition-colors duration-200 rounded-sm cursor-pointer select-none inline-block shadow-md ${containerPadding[size]} ${className}`}
    >
      <div className="flex flex-col items-start leading-none font-sans">
        {/* Top Row: "THE DESI" + Stylized Globe Icon */}
        <div className="flex items-center justify-between w-full gap-2 mb-0.5">
          <span className={`font-extrabold text-white uppercase tracking-[0.12em] font-sans ${topTextSize[size]}`}>
            THE DESI
          </span>
          
          {/* Globe swirl icon matching reference image */}
          <svg 
            className={`${globeSize[size]} text-white shrink-0 ml-1`} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" opacity="0.3" />
            <path d="M 10 40 C 30 15, 70 15, 90 40" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 5 55 C 25 35, 75 35, 95 55" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 12 70 C 30 55, 70 55, 88 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M 22 82 C 40 70, 60 70, 78 82" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bottom Row: "NEWS" in heavy bold block font */}
        <div className={`font-black text-white uppercase tracking-[0.02em] font-sans leading-none w-full text-left ${newsTextSize[size]}`}>
          NEWS
        </div>

        {/* Speech-Bubble Pointer Underline Stroke */}
        <div className="w-full mt-1">
          <svg className="w-full h-2.5 text-white" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path 
              d="M 0 2 H 32 L 40 14 L 48 2 H 200" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              fill="none" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

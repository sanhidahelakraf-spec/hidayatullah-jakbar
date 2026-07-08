import React from 'react';

interface HidayatullahLogoProps {
  className?: string;
  size?: number;
}

export const HidayatullahLogo: React.FC<HidayatullahLogoProps> = ({
  className = 'w-12 h-12',
  size = 120,
}) => {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer 8-pointed star (Octagram) */}
      <g>
        {/* Overlapping Square 1 (Rotated 45 deg) */}
        <rect
          x="45"
          y="45"
          width="310"
          height="310"
          transform="rotate(45, 200, 200)"
          fill="#111111"
          stroke="#ffffff"
          strokeWidth="6"
        />
        {/* Overlapping Square 2 (Normal) */}
        <rect
          x="45"
          y="45"
          width="310"
          height="310"
          fill="#111111"
          stroke="#ffffff"
          strokeWidth="6"
        />
      </g>

      {/* Inner Central Square border */}
      <rect
        x="78"
        y="78"
        width="244"
        height="244"
        fill="#111111"
        stroke="#ffffff"
        strokeWidth="6"
      />

      {/* Brand Text "HIDAYATULLAH" */}
      <text
        x="96"
        y="114"
        fill="#ffffff"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="1"
      >
        HIDAYATULLAH
      </text>

      {/* Minaret / Dome Pillars (Center of the logo) */}
      <g>
        {/* Outermost Left Pillar */}
        <path
          d="M 166,240 L 166,170 L 176,155 L 176,240 Z"
          fill="#ffffff"
        />
        {/* Inner Left Pillar */}
        <path
          d="M 181,240 L 181,145 L 191,130 L 191,240 Z"
          fill="#ffffff"
        />
        {/* Center Pillar */}
        <path
          d="M 196,240 L 196,120 L 204,105 L 204,120 L 204,240 Z"
          fill="#ffffff"
        />
        {/* Inner Right Pillar */}
        <path
          d="M 209,240 L 209,130 L 219,145 L 219,240 Z"
          fill="#ffffff"
        />
        {/* Outermost Right Pillar */}
        <path
          d="M 224,240 L 224,155 L 234,170 L 234,240 Z"
          fill="#ffffff"
        />
      </g>

      {/* Quran (Open Book) at the Bottom */}
      <g>
        {/* Green Book Base (Left and Right pages) */}
        {/* Left Page cover/base */}
        <path
          d="M 96,305 L 194,305 L 194,245 L 120,245 Z"
          fill="#78c234"
        />
        {/* Right Page cover/base */}
        <path
          d="M 304,305 L 206,305 L 206,245 L 280,245 Z"
          fill="#78c234"
        />

        {/* White pages inside - Left Page */}
        <path
          d="M 104,300 L 190,300 L 190,250 L 124,250 Z"
          fill="#78c234"
        />
        {/* White pages inside - Right Page */}
        <path
          d="M 296,300 L 210,300 L 210,250 L 276,250 Z"
          fill="#78c234"
        />

        {/* Stripes representing text lines in Quran - Left Page */}
        <line x1="118" y1="258" x2="186" y2="258" stroke="#ffffff" strokeWidth="4" />
        <line x1="114" y1="266" x2="186" y2="266" stroke="#ffffff" strokeWidth="4" />
        <line x1="110" y1="274" x2="186" y2="274" stroke="#ffffff" strokeWidth="4" />
        <line x1="106" y1="282" x2="186" y2="282" stroke="#ffffff" strokeWidth="4" />
        <line x1="102" y1="290" x2="186" y2="290" stroke="#ffffff" strokeWidth="4" />

        {/* Stripes representing text lines in Quran - Right Page */}
        <line x1="214" y1="258" x2="282" y2="258" stroke="#ffffff" strokeWidth="4" />
        <line x1="214" y1="266" x2="286" y2="266" stroke="#ffffff" strokeWidth="4" />
        <line x1="214" y1="274" x2="290" y2="274" stroke="#ffffff" strokeWidth="4" />
        <line x1="214" y1="282" x2="294" y2="282" stroke="#ffffff" strokeWidth="4" />
        <line x1="214" y1="290" x2="298" y2="290" stroke="#ffffff" strokeWidth="4" />

        {/* Spine / Center dividing line */}
        <rect x="194" y="243" width="12" height="64" fill="#ffffff" />
      </g>
    </svg>
  );
};

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
    <img
      src="/logo-hidayatullah.png"
      alt="Logo Hidayatullah"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};
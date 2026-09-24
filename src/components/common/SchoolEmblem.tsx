import React from 'react';

interface SchoolEmblemProps {
  className?: string;
  alt?: string;
}

export const SchoolEmblem: React.FC<SchoolEmblemProps> = ({ 
  className = "w-12 h-12",
  alt = "Logo Resmi SD Negeri Medowo 1" 
}) => {
  return (
    <img
      src="/logo.svg"
      alt={alt}
      className={`shrink-0 object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300 ${className}`}
      loading="eager"
      width={120}
      height={130}
    />
  );
};

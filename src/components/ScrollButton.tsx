'use client';

import React from 'react';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ 
  targetId, 
  children, 
  className = '',
  ariaLabel 
}) => {
  const scrollToTarget = () => {
    window.dispatchEvent(new CustomEvent('open-section', { detail: { sectionId: targetId } }));
    setTimeout(() => {
      const element = document.querySelector(`#${targetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <button 
      onClick={scrollToTarget}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default ScrollButton;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleContentProps {
  readonly sectionId: string;
  readonly children: React.ReactNode;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ sectionId, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<number | string>(0);
  const [isFullyClosed, setIsFullyClosed] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Listen to the custom event triggered by navigation or other scroll buttons
  useEffect(() => {
    const handleOpenSection = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail.sectionId === sectionId) {
        setIsOpen(true);
      }
    };

    window.addEventListener('open-section', handleOpenSection);
    return () => {
      window.removeEventListener('open-section', handleOpenSection);
    };
  }, [sectionId]);

  // Adjust visibility based on transition
  useEffect(() => {
    if (isOpen) {
      setIsFullyClosed(false);
    } else {
      const timer = setTimeout(() => {
        setIsFullyClosed(true);
      }, 500); // Matches CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Adjust the height dynamically based on the state and content scrollHeight
  useEffect(() => {
    if (isOpen) {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
        
        // After transition completes, set height to auto so resize and filter actions work
        const timer = setTimeout(() => {
          setHeight('auto');
        }, 500);
        
        return () => clearTimeout(timer);
      }
    } else {
      if (contentRef.current) {
        if (height === 'auto') {
          setHeight(contentRef.current.scrollHeight);
          // Force layout reflow
          contentRef.current.offsetHeight;
        }
      }
      const timer = setTimeout(() => {
        setHeight(0);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle window resize when expanded to update height accordingly
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Toggle Button */}
      <div className="mb-8 relative z-10">
        <button
          onClick={toggleOpen}
          className="group px-6 py-2.5 rounded-full glass-card border border-primary/20 hover:border-primary/50 text-muted-foreground hover:text-foreground text-sm font-semibold flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg cursor-pointer bg-card/50"
          aria-expanded={isOpen}
          aria-controls={`content-${sectionId}`}
        >
          <span>{isOpen ? 'Hide Details' : 'Show Details'}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 text-primary group-hover:text-accent ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/* Collapsible Container */}
      <div
        id={`content-${sectionId}`}
        ref={contentRef}
        style={{ 
          height,
          visibility: isFullyClosed ? 'hidden' : 'visible'
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out w-full"
      >
        <div className={`transition-opacity duration-500 w-full ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleContent;

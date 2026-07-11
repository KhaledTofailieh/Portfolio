'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface CertificationFilterProps {
  categories: string[];
  categoryCounts?: Record<string, number>;
  onCategoryChange?: (category: string) => void;
}

const CertificationFilter: React.FC<CertificationFilterProps> = ({
  categories,
  categoryCounts,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // Filter certification cards by data attribute
  useEffect(() => {
    const certCards = document.querySelectorAll('[data-cert-categories]');
    certCards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardCategories = cardElement.getAttribute('data-cert-categories');
      const categoriesArray = cardCategories ? cardCategories.split(',') : [];
      
      if (selectedCategory === 'All' || categoriesArray.includes(selectedCategory)) {
        cardElement.style.display = 'grid';
      } else {
        cardElement.style.display = 'none';
      }
    });
  }, [selectedCategory]);

  return (
    <div className="mb-12">
      {/* Mobile: Compact Dropdown */}
      <div className="md:hidden">
        <div className="relative max-w-xs mx-auto">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full appearance-none bg-background border border-border rounded-full px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => {
              const count = categoryCounts?.[category];
              return (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Certifications' : category}
                  {count !== undefined ? ` (${count})` : ''}
                </option>
              );
            })}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Desktop: Button Pill Layout */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const count = categoryCounts?.[category];
          const isSelected = selectedCategory === category;

          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="transition-all duration-200 hover:scale-105 rounded-full px-4 flex items-center gap-1.5"
            >
              <span>{category === 'All' ? 'All Certifications' : category}</span>
              {isSelected && count !== undefined && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold rounded-full bg-primary-foreground/20 text-primary-foreground animate-fade-in">
                  {count}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CertificationFilter;

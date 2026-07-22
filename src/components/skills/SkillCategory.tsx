'use client';

import React, { useState } from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import SkillItem from './SkillItem';

interface Skill {
  readonly name: string;
  readonly experience: string;
  readonly context: string;
  readonly category: string;
  readonly icon: string;
}

interface SkillCategoryProps {
  title: string;
  icon: LucideIcon;
  skills: readonly Skill[];
}

const INITIAL_SHOW_COUNT = 5;

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = icon;

  const hasMore = skills.length > INITIAL_SHOW_COUNT;
  const displayedSkills = isExpanded ? skills : skills.slice(0, INITIAL_SHOW_COUNT);

  return (
    <div className="glass-card p-4 rounded-xl w-full max-w-sm sm:w-96 flex-shrink-0 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 iconic rounded-lg bg-primary mr-3 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-background stroke-2" />
            </div>
            <h3 className="md:text-lg font-semibold text-foreground">
              {title}
            </h3>
          </div>
          {hasMore && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
              title={isExpanded ? 'Show less' : 'Show all skills'}
            >
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        <div className="space-y-2">
          {displayedSkills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-full mt-3 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary bg-secondary/30 hover:bg-secondary/60 rounded-lg transition-all duration-200 border border-border/40 hover:border-primary/30 group"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Show Less' : `Show ${skills.length - INITIAL_SHOW_COUNT} More`}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
          />
        </button>
      )}
    </div>
  );
};

export default SkillCategory;

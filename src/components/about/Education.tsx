import React from 'react';
import { GraduationCap, Calendar, Landmark } from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

const Education: React.FC = () => {
  return (
    <div className="mb-8 lg:mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
      {personalInfo.education.map((edu, index) => (
        <div 
          key={index}
          className="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 group w-full"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={22} className="text-primary" />
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                {edu.degree}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
                <Landmark size={13} className="text-muted-foreground/70 flex-shrink-0" />
                <span>{edu.institution}</span>
              </p>
            </div>
          </div>
            
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Calendar size={12} />
              <span className="whitespace-nowrap">{edu.duration}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;

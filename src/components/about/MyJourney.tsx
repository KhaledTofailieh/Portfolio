import React from 'react';
import { Compass } from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

const MyJourney: React.FC = () => {
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>');
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
          <Compass size={20} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground tracking-tight">My Journey</h3>
      </div>
      
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden border border-white/10 shadow-xl flex-1 flex flex-col justify-between">
        <div className="relative z-10 space-y-4 text-muted-foreground/90 text-base md:text-lg leading-relaxed md:leading-loose font-normal">
          {personalInfo.personal.story.map((story, index) => (
            <p 
              key={index} 
              dangerouslySetInnerHTML={{ __html: formatText(story) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJourney;


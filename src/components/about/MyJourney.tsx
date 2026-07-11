import React from 'react';
import personalInfo from '@/data/personal-info.json';

const MyJourney: React.FC = () => {
  const formatText = (text: string) => {
    // Convert **bold** to styled bold and *italic* to styled italic
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-inherit">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-inherit">$1</em>');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground">My Journey</h3>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {personalInfo.personal.story.map((story, index) => (
          <p 
            key={index} 
            className='text-base md:text-lg'
            dangerouslySetInnerHTML={{ __html: formatText(story) }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyJourney;


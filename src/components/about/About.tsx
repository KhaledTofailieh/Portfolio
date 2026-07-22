import React from 'react';
import Education from './Education';
import MyJourney from './MyJourney';
import HowIWork from './HowIWork';
import Stats from './Stats';
import CollapsibleContent from '../ui/collapsible-content';
const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-gradient-to-b from-background via-background to-secondary/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Engineering intelligent AI systems and scalable backend architectures
          </p>
        </div>

        <CollapsibleContent sectionId="about">
          {/* Education Section */}
          <Education />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch w-full mb-8 lg:mb-10">
            {/* My Journey Section */}
            <MyJourney />

            {/* How I Work Section */}
            <HowIWork />
          </div>

          {/* Stats Section */}
          <Stats />
        </CollapsibleContent>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { Code2, Lightbulb, Users, Zap } from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} className="text-black stroke-2" />,
  Lightbulb: <Lightbulb size={24} className="text-black stroke-2" />,
  Users: <Users size={24} className="text-black stroke-2" />,
  Zap: <Zap size={24} className="text-black stroke-2" />,
};

const HowIWork: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground">How I Work</h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {personalInfo.principles.map((principle) => (
          <div key={principle.title} className="glass-card p-6 rounded-xl group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg iconic mr-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center flex-shrink-0">
                {iconMap[principle.icon] || <Code2 size={24} className="text-black stroke-2" />}
              </div>
              <h4 className="font-semibold text-foreground">{principle.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowIWork;

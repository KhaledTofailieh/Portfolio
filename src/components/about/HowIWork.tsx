import React from 'react';
import { Code2, Lightbulb, Users, Zap, Layers } from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

interface PrincipleConfig {
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

const principleConfigs: Record<string, PrincipleConfig> = {
  Code2: {
    icon: <Code2 size={24} className="text-cyan-400 stroke-[2.2]" />,
    gradient: "from-cyan-500/20 via-blue-500/15 to-transparent",
    borderColor: "group-hover:border-cyan-500/40",
  },
  Lightbulb: {
    icon: <Lightbulb size={24} className="text-amber-400 stroke-[2.2]" />,
    gradient: "from-amber-500/20 via-orange-500/15 to-transparent",
    borderColor: "group-hover:border-amber-500/40",
  },
  Users: {
    icon: <Users size={24} className="text-emerald-400 stroke-[2.2]" />,
    gradient: "from-emerald-500/20 via-teal-500/15 to-transparent",
    borderColor: "group-hover:border-emerald-500/40",
  },
  Zap: {
    icon: <Zap size={24} className="text-indigo-400 stroke-[2.2]" />,
    gradient: "from-indigo-500/20 via-purple-500/15 to-transparent",
    borderColor: "group-hover:border-indigo-500/40",
  },
};

const HowIWork: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
          <Layers size={20} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground tracking-tight">How I Work</h3>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3.5 sm:gap-4">
        {personalInfo.principles.map((principle) => {
          const config = principleConfigs[principle.icon] || {
            icon: <Code2 size={24} className="text-primary stroke-[2.2]" />,
            gradient: "from-primary/20 to-transparent",
            borderColor: "group-hover:border-primary/40",
          };

          return (
            <div 
              key={principle.title} 
              className={`glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 group flex items-center gap-4 sm:gap-5 relative overflow-hidden flex-1 ${config.borderColor}`}
            >
              {/* Corner ambient glow */}
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${config.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

              <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner z-10">
                {config.icon}
              </div>

              <div className="relative z-10 min-w-0 flex-1">
                <h4 className="font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors mb-1">
                  {principle.title}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowIWork;

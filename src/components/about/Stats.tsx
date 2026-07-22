import React from 'react';
import { Award, Clock, Cpu } from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

const Stats: React.FC = () => {
  const stats = [
    { 
      number: personalInfo.stats.projects, 
      label: "Projects Completed",
      icon: Award,
      gradient: "from-blue-500 to-cyan-400"
    },
    { 
      number: personalInfo.stats.yearsExperience, 
      label: "Years Experience",
      icon: Clock,
      gradient: "from-cyan-400 to-emerald-400"
    },
    { 
      number: personalInfo.stats.technologiesMastered, 
      label: "Technologies Mastered",
      icon: Cpu,
      gradient: "from-indigo-400 to-purple-400"
    }
  ];

  return (
    <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
      {stats.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <div 
            key={stat.label} 
            className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group text-center relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <IconComponent size={22} className="text-primary" />
            </div>

            <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 tracking-tight`}>
              {stat.number}
            </div>
            
            <div className="text-muted-foreground font-medium text-xs md:text-sm">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;

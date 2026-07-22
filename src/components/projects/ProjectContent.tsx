"use client";

import React from 'react';
import { 
  Github, 
  Building2, 
  Lock, 
  FolderOpen, 
  BookOpen, 
  Play, 
  Globe, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectContentProps {
  project: {
    id: number;
    title: string;
    subtitle: string;
    company?: string;
    description: string;
    longDescription?: string;
    technologies: readonly string[];
    featured: boolean;
    status: string;
    project_type?: string;
    code_shareable?: boolean;
    live_url?: string;
    asset?: string;
    asset_type?: string;
    role?: string;
  };
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const [showAllTech, setShowAllTech] = React.useState(false);
  const [showLongDesc, setShowLongDesc] = React.useState(false);

  // Calculate dynamic visible tech count based on character length to fill roughly 1.5 lines
  const MAX_CHARS = 45;
  let charCount = 0;
  let visibleTechCount = 0;
  
  for (let i = 0; i < project.technologies.length; i++) {
    charCount += project.technologies[i].length + 4;
    visibleTechCount++;
    if (charCount > MAX_CHARS && visibleTechCount >= 3) {
      break;
    }
  }
  
  if (project.technologies.length - visibleTechCount === 1) {
    visibleTechCount = project.technologies.length;
  }

  // Get dynamic badge color variations based on status
  const getStatusBadgeStyles = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('deployed') || s.includes('production') || s.includes('active')) {
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'; // Green variation
    }
    if (s.includes('delivered') || s.includes('mentored')) {
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'; // Blue variation
    }
    return 'bg-secondary/50 text-secondary-foreground border-transparent';
  };

  // Get dynamic badge color variations based on project type
  const getProjectTypeBadgeStyles = (type: string) => {
    const t = type.toLowerCase();
    switch (t) {
      case 'software':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'curriculum':
      case 'tutorial':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'; // Yellow/Amber variation
      case 'coaching':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20'; // Red/Rose variation
      default:
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    }
  };

  // Helper to render asset action button dynamically
  const renderAssetButton = () => {
    const isCurriculum = project.project_type === 'Curriculum';
    
    if (!isCurriculum && (project.code_shareable === false || !project.asset)) {
      return null;
    }

    let Icon = FolderOpen;
    let label = 'View Materials';

    if (project.asset_type) {
      switch (project.asset_type) {
        case 'github_repo':
          Icon = Github;
          label = 'Show Repo';
          break;
        case 'google_drive':
          Icon = FolderOpen;
          label = 'View Materials';
          break;
        case 'medium_article':
          Icon = BookOpen;
          label = 'Read Article';
          break;
        case 'youtube_video':
          Icon = Play;
          label = 'Watch Video';
          break;
        case 'website':
          Icon = Globe;
          label = 'Visit Website';
          break;
      }
    }

    const isAvailable = !!project.asset;

    if (isAvailable) {
      return (
        <Button size="sm" variant="default" asChild className="flex-1 group/asset-btn">
          <a href={project.asset} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90">
            <Icon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover/asset-btn:scale-110" />
            {label}
          </a>
        </Button>
      );
    } else {
      return (
        <Button size="sm" variant="outline" disabled className="flex-1 opacity-50 cursor-not-allowed flex items-center justify-center">
          <Icon className="w-4 h-4 mr-2" />
          {label} (Unavailable)
        </Button>
      );
    }
  };

  return (
    <div className="p-6 flex flex-col flex-grow">
      {/* Badges Container */}
      <div className="flex justify-between items-start mb-4 gap-4">
        {/* Left Column: Status & Confidentiality */}
        <div className="flex flex-col gap-1.5 items-start">
          <Badge variant="outline" className={`text-xs font-semibold ${getStatusBadgeStyles(project.status)}`}>
            {project.status}
          </Badge>
          {project.code_shareable === false && (
            <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-500 border-rose-500/20 flex items-center font-medium">
              <Lock className="w-3 h-3 mr-1 inline" />
              Proprietary
            </Badge>
          )}
        </div>

        {/* Right Column: Featured & Project Type */}
        <div className="flex flex-col gap-1.5 items-end">
          {project.featured && (
            <Badge variant="default" className="text-xs font-semibold px-2.5 py-0.5 shadow-sm bg-gradient-to-r from-amber-500/90 via-amber-400/90 to-yellow-500/90 text-slate-950 flex items-center border border-amber-300/40">
              <Sparkles className="w-3 h-3 mr-1 fill-slate-950 text-slate-950 animate-pulse" />
              Featured
            </Badge>
          )}
          {project.project_type && (
            <Badge variant="outline" className={`text-xs font-semibold ${getProjectTypeBadgeStyles(project.project_type)}`}>
              {project.project_type}
            </Badge>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 min-h-[56px] line-clamp-2" title={project.title}>
        {project.title}
      </h3>

      <p className="text-sm text-primary font-medium mb-3 min-h-[40px] line-clamp-2" title={project.subtitle}>
        {project.subtitle}
      </p>

      {/* Description Section with New Update */}
      <div className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-[90px]">
        <p className={showLongDesc ? '' : 'line-clamp-3'}>
          {showLongDesc && project.longDescription ? project.longDescription : project.description}
        </p>
        {project.longDescription && (
          <button
            onClick={() => setShowLongDesc(!showLongDesc)}
            className="mt-2 text-primary hover:underline font-medium focus:outline-none inline-flex items-center gap-1 text-xs"
          >
            {showLongDesc ? 'Show summary' : 'Read full details →'}
          </button>
        )}
      </div>

      {/* Technologies Section with New Update */}
      <div className="flex flex-wrap gap-2 mb-4 pt-4 border-t border-border/50">
        {(showAllTech ? project.technologies : project.technologies.slice(0, visibleTechCount)).map((tech, techIndex) => (
          <Badge key={techIndex} variant="outline" className="text-xs bg-primary/10 border-primary/20 text-foreground">
            {tech}
          </Badge>
        ))}
        {!showAllTech && project.technologies.length > visibleTechCount && (
          <Badge
            variant="secondary"
            className="text-xs cursor-pointer hover:bg-primary/20 text-primary font-medium transition-colors shadow-sm"
            onClick={() => setShowAllTech(true)}
          >
            +{project.technologies.length - visibleTechCount} more
          </Badge>
        )}
        {showAllTech && project.technologies.length > visibleTechCount && (
          <Badge
            variant="secondary"
            className="text-xs cursor-pointer hover:bg-primary/20 text-primary font-medium transition-colors shadow-sm"
            onClick={() => setShowAllTech(false)}
          >
            Show less
          </Badge>
        )}
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-wrap gap-3 mt-auto pt-2">
        {/* Dynamic Asset Button */}
        {renderAssetButton()}

        {/* Live Demo / Visit Platform Button */}
        {project.live_url && (
          <Button size="sm" variant="default" asChild className="flex-1 group/live-btn shadow-md">
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-200 group-hover/live-btn:translate-x-0.5 group-hover/live-btn:-translate-y-0.5" />
              Visit Platform
            </a>
          </Button>
        )}

        {/* Non-shareable code placeholder when no links are available */}
        {project.code_shareable === false && !project.live_url && (
          <div className="flex-1 text-center py-2 px-3 text-xs border border-border bg-muted/30 text-muted-foreground rounded-md flex items-center justify-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            Proprietary Codebase
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContent;

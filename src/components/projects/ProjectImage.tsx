"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Sparkles, ChevronLeft, ChevronRight, Lock, ExternalLink, FolderOpen, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectImageProps {
  project: {
    id: number;
    title: string;
    subtitle: string;
    image?: string;
    images?: readonly string[];
    featured?: boolean;
    code_shareable?: boolean;
    live_url?: string;
    asset?: string;
    asset_type?: string;
    role?: string;
    project_type?: string;
  };
}

const ProjectImage: React.FC<ProjectImageProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images list (fallback to single image if images array is empty or undefined)
  const imagesList: readonly string[] = project.images && project.images.length > 0
    ? project.images
    : [project.image || "/projects-images/Subul.png"];

  const hasMultipleImages = imagesList.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  // Get action button for the hover state
  const renderHoverAction = () => {
    if (project.live_url) {
      return (
        <Button size="sm" variant="secondary" asChild className="shadow-lg backdrop-blur-sm">
          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Platform
          </a>
        </Button>
      );
    }

    const isCurriculum = project.project_type === 'Curriculum';

    if (isCurriculum) {
      if (project.asset) {
        return (
          <Button size="sm" variant="secondary" asChild className="shadow-lg backdrop-blur-sm">
            <a href={project.asset} target="_blank" rel="noopener noreferrer">
              <FolderOpen className="w-4 h-4 mr-2" />
              Materials
            </a>
          </Button>
        );
      } else {
        return (
          <Button size="sm" variant="outline" disabled className="shadow-lg backdrop-blur-sm opacity-50 cursor-not-allowed flex items-center justify-center">
            <FolderOpen className="w-4 h-4 mr-2" />
            Materials Unavailable
          </Button>
        );
      }
    }

    if (project.code_shareable !== false && project.asset) {
      const isGithub = project.asset_type === 'github_repo';
      return (
        <Button size="sm" variant="secondary" asChild className="shadow-lg backdrop-blur-sm">
          <a href={project.asset} target="_blank" rel="noopener noreferrer">
            {isGithub ? <Github className="w-4 h-4 mr-2" /> : <FolderOpen className="w-4 h-4 mr-2" />}
            {isGithub ? 'Code' : 'Materials'}
          </a>
        </Button>
      );
    }

    // Proprietary placeholder on hover
    return (
      <Badge variant="outline" className="shadow-lg backdrop-blur-md bg-destructive/20 text-destructive-foreground border-destructive/30 px-3 py-1.5 flex items-center gap-1.5 font-semibold text-xs animate-fade-in">
        <Lock className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
        Proprietary Codebase
      </Badge>
    );
  };

  return (
    <div className="relative overflow-hidden group">
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-30">
          <Badge variant="default" className="shadow-md text-xs font-semibold px-2.5 py-1 flex items-center gap-1 backdrop-blur-md">
            <Sparkles className="w-3 h-3 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      {/* Role Badge */}
      {project.role && (
        <div className="absolute top-3 right-3 z-30">
          <Badge
            variant="outline"
            className="shadow-md text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 bg-black/40 border-white/10 text-white backdrop-blur-md"
          >
            <Briefcase className="w-3 h-3 text-emerald-400" />
            {project.role}
          </Badge>
        </div>
      )}

      {/* Image Slider Wrapper */}
      <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20">
        <Image
          src={imagesList[currentIndex] || "/projects-images/Subul.png"}
          alt={`${project.title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={project.featured}
        />
      </div>

      {/* Carousel Navigation Arrows */}
      {hasMultipleImages && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators / Dots */}
      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex space-x-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
          {imagesList.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hover Actions Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
        <div className="flex space-x-4">
          {renderHoverAction()}
        </div>
      </div>
    </div>
  );
};

export default ProjectImage;

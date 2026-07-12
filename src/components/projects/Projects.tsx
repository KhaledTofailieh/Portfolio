// Server Component - No 'use client' directive for SEO benefits
import React from 'react';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';
import CallToAction from './CallToAction';
import personalInfo from '@/data/personal-info.json';
import CollapsibleContent from '../ui/collapsible-content';

interface Project {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly company?: string;
  readonly year?: number | string;
  readonly description: string;
  readonly longDescription: string;
  readonly technologies: readonly string[];
  readonly featured: boolean;
  readonly categories: readonly string[];
  readonly image?: string;
  readonly images?: readonly string[];
  readonly status: string;
  readonly priority?: number;
  readonly project_type?: string;
  readonly code_shareable?: boolean;
  readonly live_url?: string;
  readonly asset?: string;
  readonly asset_type?: string;
  readonly role?: string;
}

const Projects: React.FC = () => {
  // Use actual projects from personal data and sort by priority
  const projects: readonly Project[] = personalInfo.projects
    .slice() // Create a copy to avoid mutating the original array
    .sort((a, b) => {
      // Sort by priority (lower number = higher priority)
      // Projects without priority go to the end
      const priorityA = a.priority ?? 999;
      const priorityB = b.priority ?? 999;
      return priorityA - priorityB;
    });

  // Dynamically generate categories from all project categories
  const allCategories = projects.flatMap(project => project.categories);
  const uniqueCategories = Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b));
  const categories = ['All', ...uniqueCategories];

  // Calculate counts per project category
  const categoryCounts: Record<string, number> = {
    All: projects.length,
  };
  projects.forEach((project) => {
    project.categories.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative solutions that bridge AI/ML technology with real-world impact
          </p>
        </div>

        <CollapsibleContent sectionId="projects">
          {/* Category Filter - CLIENT COMPONENT FOR INTERACTIVITY */}
          <ProjectFilter categories={categories} categoryCounts={categoryCounts} />

          {/* Projects Grid - ALL PROJECTS SERVER-RENDERED FOR SEO */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Call to Action */}
          <CallToAction />
        </CollapsibleContent>
      </div>
    </section>
  );
};

export default Projects;

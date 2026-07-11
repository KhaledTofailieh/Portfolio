import React from 'react';
import ProjectImage from './ProjectImage';
import ProjectContent from './ProjectContent';

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      data-project-categories={project.categories.join(',')}
      className={`glass-card rounded-xl overflow-hidden group animate-fade-in-up flex flex-col h-full ${project.featured ? 'md:col-span-2 xl:col-span-1' : ''
        }`}
    >
      {/* Project Image */}
      <ProjectImage project={project} />

      {/* Project Content */}
      <ProjectContent project={project} />
    </div>
  );
};

export default ProjectCard;

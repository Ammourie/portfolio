import { ProjectCard } from "@/app/components/ProjectCard";
import { Flex } from "@/once-ui/components";

export interface IProject {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  mainImage: string | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectsProps {
  projects: IProject[];
  range?: [number, number?];
}

export function Projects({ projects, range }: ProjectsProps) {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Flex fillWidth gap="l" marginBottom="40" paddingX="l" direction="column">
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Flex>
  );
}

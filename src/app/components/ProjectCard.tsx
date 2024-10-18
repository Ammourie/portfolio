"use client";

import {
  AvatarGroup,
  Button,
  Flex,
  Heading,
  RevealFx,
  Text,
} from "@/once-ui/components";
import { useEffect, useState } from "react";
import { IProject } from "@/app/work/components/Projects";
import Image from "next/image";
import ImageViewer from "awesome-image-viewer";
interface ProjectCardProps {
  project: IProject;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex fillWidth gap="m" direction="column">
      <Flex alignItems="center" gap="s" justifyContent="flex-start">
        <RevealFx
          style={{ width: "auto" }}
          delay={0.4}
          trigger={isTransitioning}
          speed="fast"
        >
          <Image
            tabIndex={0}
            alt={project.title}
            width={100}
            height={100}
            src={project.mainImage!}
            style={{
              border: "1px solid var(--neutral-alpha-weak)",
            }}
          />
        </RevealFx>
        {project.title && (
          <Heading as="h2" wrap="balance" variant="display-strong-xs">
            {project.title}
          </Heading>
        )}
      </Flex>
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="l"
        paddingTop="xs"
        paddingBottom="m"
        gap="l"
      >
        {project.description?.trim() && (
          <Flex flex={7} direction="column" gap="s">
            <Text
              wrap="balance"
              variant="body-default-s"
              onBackground="neutral-weak"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="start" paddingTop="m" paddingBottom="m" fillWidth>
        <Button
          onClick={() => {
            new ImageViewer({
              images: project.images.map((image) => ({
                mainUrl: image,
              })),
            });
          }}
          variant="primary"
          style={{ width: "25%" }}
        >
          Images
        </Button>
      </Flex>
    </Flex>
  );
};

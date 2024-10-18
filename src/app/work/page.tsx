import { getPosts } from "@/app/utils";
import { Flex } from "@/once-ui/components";
import { Projects } from "@/app/work/components/Projects";
import { baseURL, person, work } from "../resources";
import { prisma } from "@/lib/prisma";

export function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Work() {
  async function getProjects() {
    try {
      const projects = await prisma.project.findMany();
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }

  const allProjects = await getProjects();

  return (
    <Flex fillWidth maxWidth="m" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.title,
              description: project.description,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.mainImage}`,
            })),
          }),
        }}
      />
      <Projects projects={allProjects} />
    </Flex>
  );
}

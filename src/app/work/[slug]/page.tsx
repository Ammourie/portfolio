import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import { formatDate, getPosts } from "@/app/utils";
import {
  AvatarGroup,
  Button,
  Flex,
  Heading,
  SmartImage,
  Text,
} from "@/once-ui/components";
import { baseURL, person } from "@/app/resources";
import { prisma } from "@/lib/prisma";
import MasonryGrid from "@/app/gallery/components/MasonryGrid";

interface WorkParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  let posts = getPosts(["src", "app", "work", "projects"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: WorkParams) {
  // read route params
  const slug = params.slug;

  // fetch data
  const project = await prisma.project.findFirst({
    where: {
      slug: slug,
    },
  });

  return {
    title: project?.title ?? "Untitled Project",
    description: project?.description ?? "No description available.",
    openGraph: {
      title: project?.title ?? "Untitled Project",
      description: project?.description ?? "No description available.",
      type: "website",
      url: `https://${baseURL}/gallery`,
      images: [
        {
          url: `https://${baseURL}/og?title=${encodeURIComponent(
            project?.title ?? "Untitled Project"
          )}`,
          alt: project?.title ?? "Untitled Project",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project?.title ?? "Untitled Project",
      description: project?.description ?? "No description available.",
      images: [
        `https://${baseURL}/og?title=${encodeURIComponent(
          project?.title ?? "Untitled Project"
        )}`,
      ],
    },
  };
}

export default async function Project({ params }: WorkParams) {
  let post = await prisma.project.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <Flex fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: post.title,
            description: post.description,
            url: `https://${baseURL}/gallery`,
            image: post.images.map((image) => ({
              "@type": "ImageObject",
              url: `${baseURL}${image}`,
              description: "",
            })),
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <MasonryGrid imageUrls={post.images} />
    </Flex>
  );
}

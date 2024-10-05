import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { person, home, social, baseURL } from "@/app/resources";
import TableOfContents from "@/app/components/TableOfContents";
import AboutMeCard from "./components/about-me-card";
import styles from "./home.module.scss";
import Separator from "./components/separator";
export function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

const structure = [
  {
    title: home.intro.title,
    display: home.intro.display,
    items: [],
  },
  {
    title: home.work.title,
    display: home.work.display,
    items: home.work.experiences.map((experience) => experience.company),
  },
  {
    title: home.studies.title,
    display: home.studies.display,
    items: home.studies.institutions.map((institution) => institution.name),
  },
  {
    title: home.technical.title,
    display: home.technical.display,
    items: home.technical.skills.map((skill) => skill.title),
  },
];

export default function About() {
  return (
    <Flex fillWidth maxWidth="m" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: home.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: home.work.experiences[0].company || "",
            },
          }),
        }}
      />
      {home.tableOfContent.display && (
        <Flex
          style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          direction="column"
          hide="s"
        >
          <TableOfContents structure={structure} home={home} />
        </Flex>
      )}
      <Flex fillWidth mobileDirection="column" justifyContent="center">
        <Flex
          className={styles.blockAlign}
          fillWidth
          flex={9}
          maxWidth={40}
          direction="column"
          gap="xl"
        >
          <Flex direction="column" fillWidth id={home.intro.title}>
            <AboutMeCard /> <Separator />
            {home.intro.display && (
              <Flex direction="column" textVariant="body-default-l" fillWidth>
                {home.intro.description}
              </Flex>
            )}
          </Flex>
          {home.work.display && (
            <>
              <Heading
                as="h2"
                id={home.work.title}
                variant="display-strong-s"
                className={styles.workExperience__container}
              >
                {home.work.title}
              </Heading>
              <Flex
                direction="column"
                fillWidth
                gap="l"
                className={styles.workExperience__container}
              >
                {home.work.experiences.map((experience, index) => (
                  <Flex
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                    direction="column"
                    className={styles.workExperience__item}
                  >
                    <Flex
                      fillWidth
                      justifyContent="space-between"
                      alignItems="flex-end"
                      marginBottom="4"
                    >
                      <Text
                        id={experience.company}
                        variant="heading-strong-l"
                        className={styles.workExperience__company}
                      >
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                        className={styles.workExperience__timeframe}
                      >
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                      className={styles.workExperience__role}
                    >
                      {experience.role}
                    </Text>
                    <Flex
                      as="ul"
                      direction="column"
                      gap="16"
                      className={styles.workExperience__achievements}
                    >
                      {experience.achievements.map((achievement, index) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Flex>
                    {experience.images.length > 0 && (
                      <Flex fillWidth className={styles.workExperience__images}>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            borderStyle="solid-1"
                            radius="m"
                            // @ts-ignore
                            minWidth={image.width}
                            // @ts-ignore
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius="m"
                              // @ts-ignore
                              sizes={image.width.toString()}
                              // @ts-ignore
                              alt={image.alt}
                              // @ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Flex>
                ))}
              </Flex>
            </>
          )}

          {home.studies.display && (
            <>
              <Heading
                as="h2"
                id={home.studies.title}
                variant="display-strong-s"
              >
                {home.studies.title}
              </Heading>
              <Flex
                direction="column"
                fillWidth
                gap="l"
                marginBottom="40"
                className={styles.studies__container}
              >
                {home.studies.institutions.map((institution, index) => (
                  <Flex
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                    direction="column"
                    className={styles.studies__item}
                  >
                    <Text
                      id={institution.name}
                      variant="heading-strong-l"
                      className={styles.studies__institution}
                    >
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak"
                      className={styles.studies__description}
                    >
                      {institution.description}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </>
          )}

          {home.technical.display && (
            <>
              <Heading
                as="h2"
                id={home.technical.title}
                variant="display-strong-s"
              >
                {home.technical.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                <Text variant="heading-strong-l">Proficient</Text>
                <Flex fillWidth gap="s" wrap className={styles.technical__proficient}>
                  {home.technical.skills
                    .filter((skill) => skill.isProficient)
                    .map((skill, index) => (
                      <Flex
                        key={`${skill.title}-${index}`}
                        direction="column"
                        align="center"
                        justifyContent="center"
                        width={7}
                        height={7}
                        border="neutral-medium"
                        borderStyle="solid-1"
                        radius="m"
                        className={styles.technical__skill}
                      >
                        <Text variant="body-strong-s">{skill.title}</Text>
                      </Flex>
                    ))}
                </Flex>
                <Flex direction="column" fillWidth gap="l">
                  <Text variant="heading-strong-l">Familiar</Text>
                  <Flex fillWidth gap="m" wrap className={styles.technical__familiar}>
                    {home.technical.skills
                      .filter((skill) => skill.isFamiliar)
                      .map((skill, index) => (
                        <Flex
                          key={`${skill.title}-${index}`}
                          direction="column"
                          align="center"
                          justifyContent="center"
                          width={7}
                          height={7}
                          border="neutral-medium"
                          borderStyle="solid-1"
                          radius="m"
                          className={styles.technical__skill}
                        >
                          <Text variant="body-strong-s">{skill.title}</Text>
                        </Flex>
                      ))}
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

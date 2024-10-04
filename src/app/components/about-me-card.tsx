import { Avatar, Button, Flex, Icon, Tag, Text } from "@/once-ui/components";
import { about, person, social, style } from "../resources";
import styles from "./about-me-card.module.scss";

const AboutMeCard = () => {
  return (
    <>
      {
        <Flex
          minWidth="160"
          paddingX="0"
          paddingBottom="s"
          gap="m"
          flex={3}
          direction="row"
          alignItems="flex-start"
        >
          {about.avatar.display && (
            <Flex direction="column" alignItems="center" marginRight="l">
              <Avatar src={person.avatar} size="xl" />
            </Flex>
          )}
          <Flex direction="column" flex={1} gap="m">
            <Flex gap="8" alignItems="center">
              <Text
                variant="heading-strong-xl"
                style={{
                  fontSize: about.avatar.display ? "2.5rem" : "3rem",
                  color: "var(--brand-strong)",
                  letterSpacing: "-0.02em",
                }}
              >
                {person.name}
              </Text>
            </Flex>
            <Flex gap="8" alignItems="center">
              <Text
                variant="body-strong-l"
                onBackground="neutral-weak"
                style={{
                  fontSize: about.avatar.display ? "1.5rem" : "1.75rem",
                  fontWeight: 600,
                  color: "grey",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {person.role}
              </Text>
            </Flex>
            <Flex gap="8" alignItems="center">
              <Icon onBackground="accent-weak" name="globe" />
              <Text
                variant="body-default-m"
                onBackground="accent-weak"
                style={{
                  fontSize: "1rem",
                }}
              >
                {person.location}
              </Text>
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
               {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                gap="s"
                wrap
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      />
                    )
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      }
    </>
  );
};

export default AboutMeCard;

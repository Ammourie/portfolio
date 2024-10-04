"use client";

import React from "react";
import { Flex, Text } from "@/once-ui/components";
import styles from "@/app/about/about.module.scss";
import { style } from "@/app/resources";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const [selectedSection, setSelectedSection] = React.useState(0);

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Flex
      style={{
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      direction="column"
      hide="s"
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Flex key={sectionIndex} gap="12" direction="column">
            <Flex
              style={{
                cursor: "pointer",
                background:
                  selectedSection === sectionIndex
                    ? "var(--brand-alpha-weak)"
                    : "transparent",
                borderLeft:
                  selectedSection === sectionIndex
                    ? "2px solid " + style.accent
                    : "none",
                paddingLeft: selectedSection === sectionIndex ? "6px" : "8px",
                transition: "all 0.3s ease",
                fontWeight:
                  selectedSection === sectionIndex ? "bold" : "normal",
              }}
              className={`${styles.hover} ${
                selectedSection === sectionIndex ? styles.selected : ""
              }`}
              gap="8"
              alignItems="center"
              onClick={() => {
                scrollTo(section.title, 80);
                setSelectedSection(sectionIndex);
              }}
            >
              <div
                style={{
                  height: selectedSection === sectionIndex ? "2px" : "1px",
                  width: "16px",
                  background: selectedSection === sectionIndex
                    ? style.accent
                    : style.brand
                }}
              />
              <Text color={"inherit"}>{section.title}</Text>
            </Flex>
            {about.tableOfContent.subItems && (
              <>
                {section.items.map((item, itemIndex) => (
                  <Flex
                    key={itemIndex}
                    style={{ cursor: "pointer" }}
                    className={`${styles.hover} ${
                      selectedSection === sectionIndex
                        ? styles.subItemSelected
                        : ""
                    }`}
                    gap="12"
                    paddingLeft="24"
                    alignItems="center"
                    onClick={() => {
                      scrollTo(item, 80);
                      setSelectedSection(sectionIndex);
                    }}
                  >
                    <Flex
                      height="1"
                      width="8"
                      background={"neutral-strong"}
                    ></Flex>
                    <Text color={"inherit"}>{item}</Text>
                  </Flex>
                ))}
              </>
            )}
          </Flex>
        ))}
    </Flex>
  );
};

export default TableOfContents;

"use client";

import Masonry from "react-masonry-css";
import { SmartImage } from "@/once-ui/components";
import { gallery } from "@/app/resources";
import styles from "@/app/gallery/Gallery.module.scss";

export default function MasonryGrid({ imageUrls }: { imageUrls: string[] }) {
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {imageUrls.map((image, index) => (
        <SmartImage
          key={index}
          radius="m"
          src={image}
          alt={image}
          className={styles.gridItem}
        />
      ))}
    </Masonry>
  );
}

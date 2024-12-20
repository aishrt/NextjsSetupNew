"use client";
import { Fade } from "react-slideshow-image";
import Image from "next/image";
import { getStrapiMedia } from "@/app/pageComponents/BlogComponent/utils/api-helpers";

interface Image {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface SlidShowProps {
  files: {
    data: Image[];
  };
}

export default function Slideshow({ data }: { data: SlidShowProps }) {
  return (
    <div className="slide-container">
      <Fade>
        {data?.files?.data?.map((fadeImage: Image, index) => {
          const imageUrl = getStrapiMedia(fadeImage?.attributes?.url);
          return (
            <div key={index}>
              {imageUrl && (
                <img
                  className="w-full h-96 object-cover rounded-lg"
                  height={400}
                  width={600}
                  alt="alt text"
                  src={imageUrl}
                />
              )}
            </div>
          );
        })}
      </Fade>
    </div>
  );
}

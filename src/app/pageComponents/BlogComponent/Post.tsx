import { _IMG } from "@/constants/images";
import { getStrapiMedia } from "./utils/api-helpers";
import { postRenderer } from "./utils/post-renderer";
import Image from "next/image";
import * as React from "react";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data?.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover?.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes?.avatar?.data?.attributes.url
  );
  return (
    <article>
      {imageUrl && (
        <Image
layout="intrinsic"
          src={_IMG.phishing5}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-[400px] rounded-lg mb-4"
        />
      )}

      <div className="space-y-6 blogHeadingMain">
        <h1 className="leading-tight text-2xl md:text-3xl lg:text-[32px] xl:text-4xl font-bold pb-3 ">
          {title}
        </h1>
      </div>

      <div className="">
        <p>{description}</p>
        {data?.attributes?.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
      {/* <div className="d-flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
        <div className="d-flex items-center md:space-x-2">
          {authorImgUrl && (
            <Image
layout="intrinsic"
              src={authorImgUrl}
              alt="article cover image"
              width={100}
              height={100}
              className="dmarcuserimg border rounded-full dark:bg-gray-500 dark:border-gray-700"
            />
          )}
          <p className="text-md text-[#eb5454]">
            {author && author.name} • {formatDate(publishedAt)}
          </p>
        </div>
      </div> */}
    </article>
  );
}

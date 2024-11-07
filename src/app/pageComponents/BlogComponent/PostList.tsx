// ./frontend/src/app/[lang]/components/PostList.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "./utils/api-helpers";
import { _IMG } from "@/constants/images";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
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
  };
}

export default function PostList({
  data: articles,
  timeIconData,
  calenderIconData,
  bookIcon,
  children,
}: {
  data: Article[];
  timeIconData?: any;
  calenderIconData?: any;
  bookIcon?: any;
  children?: React.ReactNode;
}) {
  return (
    <section className="container py-12 2xl:max-w-[1280px] relative mt-[-110px]">
      <div className="flex">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-12">
              <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {articles?.map((article, index) => {
                  const imageUrl: any = getStrapiMedia(
                    article?.attributes?.cover?.data?.attributes?.url
                  );
                  const category =
                    article?.attributes?.category?.data?.attributes;
                  const authorsBio =
                    article?.attributes?.authorsBio?.data?.attributes;

                  const avatarUrl = getStrapiMedia(
                    authorsBio?.avatar.data.attributes.url
                  );
                  return (
                    <div
                      key={index}
                      className="rounded-md p-8 boxShadow bg-white"
                    >
                      {imageUrl ? (
                        <Image
                          alt="Your Dmarc Blog Image"
                          width="250"
                          height="250"
                          className="rounded-md mb-4 blogpostImage"
                          src={_IMG.phishing5}
                        />
                      ) : (
                        <Image
                          alt="Your Dmarc Blog Image"
                          width="250"
                          height="250"
                          src={_IMG.phishing5}
                          className="rounded-md mb-4 blogpostImage"
                        />
                      )}

                      <div className="space-y-2 relative">
                        <div className="flex flex-row items-center gap-[20px]">
                          <p>Email deliverability</p>
                          <div className="dotBlog"></div>
                          <p>9 min</p>
                        </div>
                        <Link
                          href={`/blogs/${category?.slug}/${article?.attributes?.slug}`}
                          key={article.id}
                        >
                          <h3 className="text-[18px]  mt-3 text-[#090E12] fw-bold lg:text-[18px] xl:text-[18px]">
                            {article?.attributes?.title}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {children && children}
    </section>
  );
}

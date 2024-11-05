// ./frontend/src/app/[lang]/components/PostList.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "./utils/api-helpers";

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
                      // className="overflow-hidden rounded-[8px] shadow-[0_0_24px_rgba(0,0,0,0.1)]"
                      className="rounded-md p-8 boxShadow bg-white"
                    >
                      {/* <Link
                        href={`/blogs/${category?.slug}/${article.attributes.slug}`}
                        key={article.id}
                        // className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[100%]rounded-2xl overflow-hidden shadow-lg hover:no-underline"
                      > */}
                      {imageUrl ? (
                        <Image
                          alt="Your Dmarc Blog Image"
                          width="250"
                          height="250"
                          // className="object-cover w-full 2xl:h-[250px] xl:h-[190px]"
                          className="rounded-md mb-4 blogpostImage"
                          // src={imageUrl}
                          src="/assets/images/phishing5.png"
                        />
                      ) : (
                        <Image
                          alt="Your Dmarc Blog Image"
                          width="250"
                          height="250"
                          // className="object-cover w-full 2xl:h-[250px] xl:h-[190px]"
                          // src="/assets/images/stackIcon.svg"
                          src="/assets/images/phishing5.png"
                          className="rounded-md mb-4 blogpostImage"
                        />
                      )}

                      {/* </Link> */}
                      <div className="space-y-2 relative">
                        {/* <div className="d-flex justify-start items-center gap-[10px] mt-[10px] mb-[15px]">
                            <span className=" text-[#4B575E] text-[16px] d-flex items-center gap-[5px]">
                              <img
                                className="w-[22px]"
                                src={calenderIconData}
                                loading="lazy"
                              />
                              {formatDate(article.attributes.publishedAt)}
                            </span> */}
                        {/* <span className=" text-[#4B575E] text-[16px] d-flex items-center gap-[5px]">
                              <img className="w-[22px]" src={timeIconData} /> 05 min read
                            </span> */}
                        {/* {authorsBio && (
                              <span className=" text-[#4B575E] text-[16px]">
                                {authorsBio.name}
                              </span>
                            )}
                          </div> */}
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
            {/* <div className="col-span-12 lg:col-span-4">
              <div className="ml-5 bg-[#f7f9fa] bg-opacity-50 border border-solid border-[#4b575e]20% p-[20px] rounded-[8px] mb-[30px]">
                <div className="mb-[30px]">
                  <h2 className="text-[22px] text-[#090E12] font-extrabold">
                    Recent Posts
                  </h2>
                </div>
                {articles.slice(0, 3).map((article) => {
                  const imageUrl: any = getStrapiMedia(
                    article.attributes.cover.data?.attributes.url
                  );
                  const category = article.attributes.category.data?.attributes;
                  const authorsBio =
                    article.attributes.authorsBio.data?.attributes;

                  return (
                    <>
                      <Link
                        href={`${category?.slug}/${article.attributes.slug}`}
                        key={article.id}
                        className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[100%]rounded-2xl overflow-hidden shadow-lg hover:no-underline"
                      >
                        <div className="d-flex items-start">
                          <span className="inline-block	 w-[25%]">
                            {imageUrl && (
                              <Image
                                alt="Your Dmarc Blog Image"
                                width="80"
                                height="80"
                                className="object-cover rounded-[8px] w-[80px] 2xl:w-[80px] xl:w-[60px] h-[80px] 2xl:h-[80px] xl:h-[60px] sm:w-[50px]"
                                src={imageUrl}
                              />
                            )}
                          </span>

                          <div className="w-[75%]">
                            <h4 className="font-bold text-[#090E12] text-[20px] mb-[15px] leading-[25px]">
                              {article.attributes.title}
                            </h4>
                            <p className="d-flex gap-[10px]">
                              <span className="d-flex gap-[10px] text-[#4B575E]">
                                <span className=" text-[#4B575E] text-[16px] d-flex items-center gap-[5px]">
                                  <img
                                    className="w-[22px]"
                                    src={calenderIconData}
                                    loading="lazy"
                                  />
                                  {formatDate(article.attributes.publishedAt)}
                                </span>
                              </span>
                              <span className=" text-[#4B575E] text-[16px] d-flex items-center gap-[5px]">
                                <img
                                  className="w-[22px]"
                                  src={calenderIconData}
                                  loading="lazy"
                                />
                                {formatDate(article.attributes.publishedAt)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="h-[2px] w-[100%] bg-[#4B575E] bg-opacity-10 my-[20px] last:hidden"></div>
                    </>
                  );
                })}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {children && children}
    </section>
  );
}

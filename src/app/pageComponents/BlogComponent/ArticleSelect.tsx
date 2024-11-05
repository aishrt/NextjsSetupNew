"use client";
import React, { useState } from "react";
import Link from "next/link";
import { postFetcher } from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

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

// interface Article {
//   id: number;
//   attributes: {
//     title: string;
//     slug: string;
//   };
// }

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline bg-[#eb5454] text-[#fff]"
    : "px-3 py-1 rounded-lg hover:underline bg-[#eb5454] text-[#fff]";
}

export default function   ArticleSelect({
  categories,
  articles,
  calenderIconData,
  params,
}: {
  categories: Category[];
  articles: Article[] | any;
  calenderIconData?: any;
  params: {
    slug: string;
    category: string;
  };
}) {

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    website: "",
    comment: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubscribeHandler = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res: any = await postFetcher("/api/add-subscribe-newsletter", {
        email,
      });
      if (res.code === 200) {
        toast.success(res.message);
        setIsLoading(false);
        setEmail("");
      } else {
        setEmail("");
        setIsLoading(false);
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      setEmail("");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      // setEmail('')
    }
  };
  const handleLink = () => {
    router.push(window.location.href);
  };
  return (
    <div className="p-2 rounded-lg min-h-[365px] relative xl:ml-3">
      <div>
        <div className="border mb-12 p-3 rounded-[8px] blogshadow">
          <h2 className="text-[22px] text-[#090E12] font-extrabold mb-3">
            Browse By Category
          </h2>
          <div className="flex flex-wrap p-2 space-x-2 dark:border-gray-400 gap-2 flex-row ">
            {categories.map((category: Category, index: any) => {
              if (category?.attributes?.articles?.data?.length === 0) return null;
              return (
                <Link
                  key={index}
                  href={`/blogs/${category?.attributes?.slug}`}
                  className={selectedFilter(
                    category?.attributes?.slug,
                    params?.category
                  )}
                >
                  #{category?.attributes?.name}
                </Link>
              );
            })}
            <Link href={"/blogs"} className={selectedFilter("", "filter")}>
              #all
            </Link>
          </div>
        </div>
        {/* <div className="col-span-12 lg:col-span-4">
          <div className=" bg-[#f7f9fa] bg-opacity-50 border border-solid border-[#4b575e]20% p-3 rounded-[8px] mb-12 blogshadow">
            <div className="mb-[30px]">
              <h2 className="text-[22px] text-[#090E12] font-extrabold mb-3">
                Recent Posts :
              </h2>
            </div>
            {articles
              .filter((article: any) => article.attributes.slug !== params.slug)
              .slice(0, 5)
              .map((article: any) => {
                const imageUrl: any = getStrapiMedia(
                  article.attributes.cover.data?.attributes.url
                );
                const category = article.attributes.category.data?.attributes;
                const authorsBio =
                  article.attributes.authorsBio.data?.attributes;

                return (
                  <>
                    <Link
                      href={`/blogs/${category?.slug}/${article.attributes.slug}`}
                      key={article.id}
                      className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[100%]rounded-2xl overflow-hidden shadow-lg hover:no-underline"
                    >
                      <div className="d-flex items-start gap-[7px]">
                        <span className="inline-block	 w-[25%]">
                          {imageUrl ? (
                            <Image
                              alt="Your Dmarc Blog Image"
                              width="80"
                              height="80"
                              className="object-cover rounded-[8px] w-[80px] 2xl:w-[80px] xl:w-[60px] h-[80px] 2xl:h-[80px] xl:h-[60px] sm:w-[50px]"
                              src={imageUrl}
                            />
                          ) : (
                            <Image
                              alt="Your Dmarc Blog Image"
                              width="80"
                              height="80"
                              className="object-cover rounded-[8px] w-[80px] 2xl:w-[80px] xl:w-[60px] h-[80px] 2xl:h-[80px] xl:h-[60px] sm:w-[50px]"
                              src="/assets/images/stackIcon.svg"
                            />
                          )}
                        </span>

                        <div className="w-[75%]">
                          <h4 className="font-bold text-[#090E12] text-[20px] mb-[15px] leading-[25px]">
                            {article.attributes.title}
                          </h4>
                          <p>
                            <span className=" text-[#4B575E] text-[16px]">
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

        {/* <div className="border p-3 rounded-[8px] blogshadow">
          <form>
            <div className="space-y-12">
              <div className="pb-2">
                <h2 className="text-[22px] text-[#090E12] font-extrabold mb-3">
                  Leave Comment
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                  <div className="col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={formData.firstName}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium"
                    >
                      Your Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={formData.website}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium"
                    >
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      //onChange={handleChange}
                      rows={3}
                      className="block w-full rounded-md border-1 py-1.5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {loading ? <p>Loading...</p> : null}
              {error ? <p className="text-red-500">{error}</p> : null}
              {success ? (
                <p className="text-green-500">Comment posted successfully!</p>
              ) : null}
              <button
                type="submit"
                className="rounded-md bg-[#eb5454] px-3 py-2 text-md font-semibold text-white"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div> */}

        <div className="border p-3 rounded-[8px] blogshadow bg-[#0f2138] mb-12">
          {/* <form>
            <div className="space-y-12">
              <div className="pb-2">
                <h2 className="text-[22px] text-[#090E12] font-extrabold mb-3">
                  Leave Comment
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                  <div className="col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={formData.firstName}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium"
                    >
                      Your Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={formData.website}
                      //onChange={handleChange}
                      className="block w-full rounded-md border-1 py-1.5"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium"
                    >
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      //onChange={handleChange}
                      rows={3}
                      className="block w-full rounded-md border-1 py-1.5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {loading ? <p>Loading...</p> : null}
              {error ? <p className="text-red-500">{error}</p> : null}
              {success ? (
                <p className="text-green-500">Comment posted successfully!</p>
              ) : null}
              <button
                type="submit"
                className="rounded-md bg-[#eb5454] px-3 py-2 text-md font-semibold text-white"
              >
                Post Comment
              </button>
            </div>
          </form> */}
          <div className=" text-center">
            {/* <h2 className="text-white text-xl font-bold">
              Subscribe to Our Newsletter
            </h2> */}
            <p className="text-white text-md font-bold">
                Protect your inbox, save time, and stay compliant. Subscribe to our newsletter for personalized email security audits, expert advice, and actionable tips.
            </p>
            <div className="mt-7">
              <form
                className="subscribeForm"
                onSubmit={onSubscribeHandler}
              >
                <div className="form-group">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    type="email"
                    className="form-control h-[42px]"
                    placeholder="Email Address"
                  />
                </div>
                <div className="text-center flex justify-center items-center mt-4">
                <img src="/assets/images/billu_2.png" loading="lazy" alt="Submit" id="submitImage" style={{cursor:"pointer", width:"180px"}} />
                </div>
                {/* <button
                  className="btn main-button-dark mt-3"

                  disabled={isLoading}
                >
                  Subscribe
                </button> */}
              </form>
            </div>
          </div>
        </div>
        <div className="shareonsection mb-12 text-center">
          <h6 className="text-[22px] text-[#090E12] font-extrabold">
            Share on :
          </h6>
          <div className="iconslist">
            <a
              title="Facebook"
              href="https://www.facebook.com/yourDMARC/"
              target="_blank"
              onClick={handleLink}
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              title="Instagram"
              href="https://www.instagram.com/your.dmarc/"
              target="_blank"
              onClick={handleLink}
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              title="LinkedIn"
              href="https://www.linkedin.com/company/yourdmarc/"
              target="_blank"
              onClick={handleLink}
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              title="Youtube"
              href="https://www.youtube.com/@yourDMARC"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLink}
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/${params.category}/${article?.attributes?.slug}`}
                    className={`${
                      params.slug === article?.attributes?.slug &&
                      "text-violet-400"
                    }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {article?.attributes?.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

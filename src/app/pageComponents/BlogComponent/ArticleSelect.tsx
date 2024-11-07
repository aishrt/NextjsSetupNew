"use client";
import React, { useState } from "react";
import Link from "next/link";
import { postFetcher } from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { _IMG } from "@/constants/images";

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

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline bg-[#eb5454] text-[#fff]"
    : "px-3 py-1 rounded-lg hover:underline bg-[#eb5454] text-[#fff]";
}

export default function ArticleSelect({
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
              if (category?.attributes?.articles?.data?.length === 0)
                return null;
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

        <div className="border p-3 rounded-[8px] blogshadow bg-[#0f2138] mb-12">
          <div className=" text-center">
            <p className="text-white text-md font-bold">
              Protect your inbox, save time, and stay compliant. Subscribe to
              our newsletter for personalized email security audits, expert
              advice, and actionable tips.
            </p>
            <div className="mt-7">
              <form className="subscribeForm" onSubmit={onSubscribeHandler}>
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
                  <Image
layout="intrinsic"
                    src={_IMG.billu_2}
                    loading="lazy"
                    alt="Submit"
                    id="submitImage"
                    style={{ cursor: "pointer", width: "180px" }}
                  />
                </div>
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
      </div>
    </div>
  );
}

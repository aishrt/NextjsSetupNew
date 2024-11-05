// components/Category.tsx
"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CategoryLinkProps {
  pathname: string;
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

interface CategoryProps {
  categoryLinks: CategoryLinkProps[];
  posts: any; 
}

const Category = ({ categoryLinks,posts }: CategoryProps) => {
  const pathname = usePathname();
  const [inputDomain, setInputDomain] = useState<string>('');

  const searchBlog = (e: any) => {
    e.preventDefault();
    const titles = posts.map((item:any) => item?.attributes?.title);
    const matchedTitles = titles.filter((title:any) => 
      title.toLowerCase().includes(inputDomain.toLowerCase())
    );
  };
  return (
    <>
      <div className="bg-[#0f2138]">
        <div className="container mx-auto h-auto pt-[100px] pb-[150px] 2xl:max-w-[1280px] text-center text-white">
          <h2 className="text-4xl font-bold">YOUR DMARC Blog</h2>
          <p className="text-xl mx-auto md:w-[600px] lg:w-[800px] mt-4">
            Want to be the first to know about new email archiving, compliance,
            and eDiscovery insights? Sign up for our blog updates.
          </p>
          <div className="flex flex-row items-center justify-center gap-1 mt-4">
            <input
              type="text"
              id="name"
              name="name"
              className="inputBorder_1"
              placeholder="What are you looking for?"
              onChange={(e)=>setInputDomain(e.target.value)}
            />
            <button
              className="btn main-button-dark"
              onClick={searchBlog}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

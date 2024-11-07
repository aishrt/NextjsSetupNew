"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${path === url && "dark:text-violet-400 dark:border-violet-400"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/${attributes?.slug}`}
        className="hover:dark:text-violet-400"
      >
        {attributes?.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {

  return (
<div>

</div>
    // <footer className="py-6 pb-[0]" style={{ background: "linear-gradient(180deg,rgba(60,119,240,.05),rgba(33,65,206,.05))" }}>
    //   <div className="container px-6 py-4 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
    //     <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 sm-grid-cols-2">
    //       <div className="pb-6 ">
    //         {/* <Logo src={logoUrl}>
    //           {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
    //         </Logo> */}
    //         {logoUrl && <Image src={logoUrl} alt="logo" width={45} height={45} className='w-[120px] h-[90px]' />}
    //         <p className="text-[#787878] mt-[10px]">With YOUR DMARC, boosting email campaign deliverability, safeguarding brand identity, and fortifying business reputation is a breeze.</p>
    //       </div>

    //       <div className="">
    //         <p className="text-[#000] text-[24px] font-semibold mb-[20px]">Tools</p>
    //         <ul className="pl-[15px]">
    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/dmarc-lookup`} className="text-[#787878] hover:text-[#0f2138] relative">
    //             <div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> DMARC</Link> </li>
    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/spf-lookup`} className="text-[#787878] hover:text-[#0f2138] relative">
    //             <div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> SPF</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/dkim-lookup`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> DKIM</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/tools/bimi-lookup`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> BIMI</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/mta-sts-lookup`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> MTA STS</Link> </li>
    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/tls-rpt-lookup`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> TLS RPT</Link> </li>
    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}tools/blacklist-domain-lookup`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> BLACKLIST</Link> </li>
    //         </ul>
    //       </div>

    //       <div className="">
    //         <p className="text-[#000] text-[24px] font-semibold mb-[20px]">Solutions</p>
    //         <ul className="pl-[15px]">
    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}startup`} className="text-[#787878] hover:text-[#0f2138] relative">
    //             <div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Startup</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}enterprise`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Enterprise</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}nonprofits`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Non Profit</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}healthcare`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Health Care</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}educations`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Education</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}info-tech`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Infotech</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}government`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Government</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}retail`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Retail</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}finance`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Finance</Link> </li>

    //           <li className="mb-[10px]"> <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}marketing`} className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Marketing</Link> </li>
    //         </ul>
    //       </div>

    //       <div className="">
    //         <p className="text-[#000] text-[24px] font-semibold mb-[20px]">Quick Links</p>
    //         <ul className="pl-[15px]">
    //           <li className="mb-[10px]"> <Link href="https://www.wedmarc.com/" className="text-[#787878] hover:text-[#0f2138] relative">
    //             <div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Manage Services</Link> </li>

    //           <li className="mb-[10px]"> <Link href="/" className="text-[#787878] hover:text-[#0f2138] relative"><div className="absolute left-0 top-7 w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#0f2138" }}></div> Blogs</Link> </li>
    //         </ul>
    //       </div>

    //       <div className="">
    //         <p className="text-[#000] text-[24px] font-semibold mb-[20px]">Quick Links</p>
    //         <Link href="mailto:contact@yourdmarc.com" className="text-[#787878]">
    //           {/* <Image width="250" height="250" className="object-cover w-full h-[250px]" src="email.svg" /> */}
    //           contact@yourdmarc.com</Link>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="px-6 py-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50 bg-[#0f2138]">
    //     <div className="grid grid-cols-2">
    //       <div>
    //         <p className="text-[#fff]">©Copyright 2024 - yourdmarc.com</p>
    //       </div>
    //       <div className="text-right">
    //         <Link  href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}privacy-policy`} className="text-[#fff] mr-[10px]">Privacy Policy</Link>
    //         <Link  href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}terms-condition`} className="text-[#fff]">Terms of Service</Link>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}
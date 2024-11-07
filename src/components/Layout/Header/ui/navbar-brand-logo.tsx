"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { removeHttp } from "@/utils/string-conversion";
import { Suspense } from "react";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const NavbarBrandLogo = () => {
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Link className="navbar-brand" href={domain ? `/?domain=${domain}` : `/`}>
        <Image
          src={_IMG.logo_final_blue}
          alt="logo Left Header"
          loading="lazy"
          width={20}
          height={70}
        />
      </Link>
    </Suspense>
  );
};
export default NavbarBrandLogo;

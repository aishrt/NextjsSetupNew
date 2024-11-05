"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { removeHttp } from "@/utils/string-conversion";
import { Suspense } from "react";

const NavbarBrandLogo = () => {
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Link className="navbar-brand" href={domain ? `/?domain=${domain}` : `/`}>
        <img
          src="/assets/images/logo-final-blue.svg"
          alt="logo"
          width="auto"
          height="auto" loading="lazy"
        />
      </Link>
    </Suspense>
  );
};
export default NavbarBrandLogo;

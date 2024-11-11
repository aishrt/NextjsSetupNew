import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Your DMARC | Email Compliance and Security Support",
  description:
    "Get in touch with Your DMARC for expert solutions in email compliance, domain protection, and improving your business's email security.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;

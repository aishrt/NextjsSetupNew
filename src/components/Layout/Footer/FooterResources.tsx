"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { removeHttp } from "@/utils/string-conversion";
import { Suspense } from "react";

const FooterResources = () => {
  const searchParams = useSearchParams()
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";

  return (
    <Suspense fallback={<div>Loading</div>}>
    <div className="col">
      <div className='footer-content'>
        <h5>Tools</h5>
        <div className="outerLinks">
          <ul>
            <li>
              <Link rel="canonical" href={domain ? `/tools/dmarc-lookup/?domain=${domain}` : `/tools/dmarc-lookup`}>DMARC</Link>
            </li>

            <li>
              <Link rel="canonical" href={domain ? `/tools/spf-lookup/?domain=${domain}` : `/tools/spf-lookup`}>SPF</Link>
            </li>

            <li>
              <Link rel="canonical" href={domain ? `/tools/dkim-lookup/?domain=${domain}` : `/tools/dkim-lookup`}>DKIM</Link>
            </li>

            <li>
              <Link rel="canonical" href={domain ? `/tools/bimi-lookup/?domain=${domain}` : `/tools/bimi-lookup`}>BIMI</Link>
            </li>
            
            <li>
              <Link rel="canonical" href={domain ? `/tools/mta-sts-lookup/?domain=${domain}` : `/tools/mta-sts-lookup`}>MTA STS</Link>
            </li>

            <li>
              <Link rel="canonical" href={domain ? `/tools/tls-rpt-lookup/?domain=${domain}` : `/tools/tls-rpt-lookup`}>TLS RPT</Link>
            </li>

            <li>
              <Link rel="canonical" href={domain ? `/tools/blacklist-domain-lookup/?domain=${domain}` : `/tools/blacklist-domain-lookup`}>BLACKLIST</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </Suspense>
  )
}
export default FooterResources;

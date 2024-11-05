"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ResultButton = ({
  refetchData,
  fromDashboard,
}: {
  refetchData: any;
  fromDashboard?: any;
}) => {
  const pathname = usePathname();

  const [myDomain, setMyDomain] = React.useState("" as any);

  React.useEffect(() => {
    // const myDomainval = window.localStorage.getItem("myDomain");
    setMyDomain(refetchData);

    if (refetchData) {
      window.localStorage.setItem("dashboardUrl", refetchData);
    }
  }, []);

  return (
    <div className="topButtonDashboard mt-2">
      <div className="tabsButton">
        <ul>
          <li
            className={
              pathname === `/dashboard/sender-dashboard` ? "active" : ""
            }
          >
            <Link
              href={`/dashboard/sender-dashboard?policy_published_domain=${
                refetchData ? refetchData : myDomain
              }${fromDashboard ? `&fromDashboard=true` : ""}&page=1&page_size=10`}
              title="Sources"
            >
              Senders
            </Link>
          </li>
          <li className={pathname === "/dashboard/reporters" ? "active" : ""}>
            <Link
              href={`/dashboard/reporters?domain=${
                refetchData ? refetchData : myDomain
              }${fromDashboard ? `&fromDashboard=true` : ""}`}
              title="Reporters"
            >
              Reporters
            </Link>
          </li>

          <li className={pathname === "/dashboard/results" ? "active" : ""}>
            <Link
              href={`/dashboard/results?domain=${
                refetchData ? refetchData : myDomain
              }${fromDashboard ? `&fromDashboard=true` : ""}`}
              title="Results"
            >
              Results
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ResultButton;

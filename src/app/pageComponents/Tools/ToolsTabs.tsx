"use client";
import Link from "next/link";
import { removeHttp, removeSpace } from "@/utils/string-conversion";
import { _TABS_HOME } from "@/constants/tabData";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ToolsTabs = () => {
  const tabs = _TABS_HOME;
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="toolsTab">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {tabs.map((tab, idx) => {
                  return (
                    <li
                      key={`tabs_${idx}`}
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        className={`nav-link ${!idx ? "active" : ""}`}
                        id={`pills-${removeSpace(tab.tabName)}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-${removeSpace(tab.tabName)}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-${removeSpace(tab.tabName)}`}
                        aria-selected="true"
                      >
                        {tab.tabName}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {tabs.map((tab, idx) => {
                  return (
                    <div
                      key={`tab-pan_${idx}`}
                      className={`tab-pane fade ${!idx ? "show active" : ""}`}
                      id={`pills-${removeSpace(tab.tabName)}`}
                      role="tabpanel"
                      aria-labelledby="pills-${removeSpace(tab.tabName)}-tab"
                      tabIndex={0}
                    >
                      <div className="tabInnerContet">
                        {/* <h4>{tab.mainTitle}</h4> */}

                        <div className="row gy-5">
                          {tab.tabTools.map((lookup, idx) => {
                            return (
                              <div
                                key={`lookup_${idx}`}
                                className="col-xl-3 col-lg-4 col-md-6"
                              >
                                <div className="tabCard">
                                  <div>
                                    <span>
                                      <img
                                        src={lookup.icon}
                                        alt={`Tools`}
                                        loading="lazy"
                                      />
                                    </span>
                                    <h5>{lookup.title}</h5>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: lookup.description,
                                      }}
                                    />
                                  </div>
                                  <Link
                                    rel="canonical"
                                    title="Check Record"
                                    href={
                                      domain
                                        ? `${lookup.href}?domain=${domain}`
                                        : lookup.href
                                    }
                                  >
                                    <button className="btn main-button-light">
                                      {lookup.buttonTitle}
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}

                          {!tab.tabTools.length && <>.....</>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default ToolsTabs;

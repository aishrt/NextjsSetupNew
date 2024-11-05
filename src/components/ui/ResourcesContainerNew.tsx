"use client";
import { useSearchParams } from "next/navigation";
import { removeHttp } from "@/utils/string-conversion";
import Link from "next/link";
import { Suspense } from "react";

const ResourcesContainerNew = () => {
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="resources wow fadeIn">
        <div className="thickLine">
          <img
            src="/assets/images/thickLine.svg"
            alt="Thick line used for design."
            width="auto"
            height="auto" loading="lazy"
          />
        </div>

        <div className="zigzag">
          <img
            src="/assets/images/shapeZigZag.svg"
            alt="ZigZag shape for designing"
            width="auto"
            height="auto" loading="lazy"
          />
        </div>

        <span className="dotted">
          <img
            src="/assets/images/shapeDotted.svg"
            width="auto"
            height="auto"
            alt={""} loading="lazy"
          />
        </span>
        <div className="container">
          <div className="resources-outer">
            <div className="content text-center">
              <h3>Our Resources</h3>
              <p>
                SPF records generator, DMARC records generator, BIMI records
                generator DMARC/SPF/DKIM/BIMI records check
              </p>
            </div>
            <div className="card-section">
              <div className="row gy-3 justify-content-center">
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/dmarc-lookup/?domain=${domain}`
                      : `/tools/dmarc-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/dmarcRecord.svg"
                      alt="Envelope with lock icon signifies DMARC record."
                    /> */}
                      <span className="imageBorder">
                        <img
                          src="/assets/images/DMARCRecord.webp"
                          alt=""
                          width="auto"
                          height="auto" loading="lazy"
                        />
                      </span>
                      <h5 className="card-title">DMARC Record</h5>
                      <p className="card-text">
                        Look up and generate DMARC record
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/spf-lookup/?domain=${domain}`
                      : `/tools/spf-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/spfRecord.svg"
                      alt="Eye icon representing SPF record."
                      width="auto" height="auto"
                    /> */}
                      <span className="imageBorder">
                        <img
                          src="/assets/images/SPF-Record.webp"
                          alt=""
                          width="auto"
                          height="auto" loading="lazy"
                        />
                      </span>
                      <h5 className="card-title">SPF Record</h5>
                      <p className="card-text">
                        Look up and validate your SPF record
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/dkim-lookup/?domain=${domain}`
                      : `/tools/dkim-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/dkimRecord.svg"
                      alt="Person with star logo for DKIM record lock." width="auto" height="auto"
                    /> */}

                      <span className="imageBorder">
                        <img
                          src="/assets/images/DKIM record.webp"
                          alt=""
                          width="auto"
                          height="auto" loading="lazy"
                        /> 
                      </span>
                      <h5 className="card-title">DKIM Record</h5>
                      <p className="card-text">Look up DKIM record</p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/bimi-lookup/?domain=${domain}`
                      : `/tools/bimi-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/bimiRecord.svg"
                      alt="This logo is used to display authenticated emails.
                      "
                    /> */}

                      <span className="imageBorder">
                        <img
                          src="/assets/images/BIMI-Record.webp"
                          alt=""
                          width="auto"
                          height="auto" loading="lazy"
                        />
                      </span>
                      <h5 className="card-title">BIMI Record</h5>
                      <p className="card-text">Look up DKIM record</p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/mta-sts-lookup/?domain=${domain}`
                      : `/tools/mta-sts-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/bimiRecord.svg"
                      alt="This logo is used to display authenticated emails.
                      "
                    /> */}

                      <span className="imageBorder">
                        <img src="/assets/images/MTA-STA-Record.svg" alt="" loading="lazy"/>
                      </span>
                      <h5 className="card-title">MTA STS Record</h5>
                      <p className="card-text">Look up MTA STS record</p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/tls-rpt-lookup/?domain=${domain}`
                      : `/tools/tls-rpt-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/bimiRecord.svg"
                      alt="This logo is used to display authenticated emails.
                      "
                    /> */}
                      <span className="imageBorder">
                        <img src="/assets/images/TLS-RPT-Record.svg" alt="" loading="lazy"/>
                      </span>
                      <h5 className="card-title">TLS RPT Record</h5>
                      <p className="card-text">Look up TLS RPT record</p>
                    </div>
                  </div>
                </Link>
                <Link
                  rel="canonical"
                  href={
                    domain
                      ? `/tools/blacklist-domain-lookup/?domain=${domain}`
                      : `/tools/blacklist-domain-lookup`
                  }
                  className="col-lg-3 col-md-6"
                >
                  <div className="card wow flipInX">
                    <div className="card-body">
                      {/* <img
                      className="card-image"
                      src="/assets/images/bimiRecord.svg"
                      alt="This logo is used to display authenticated emails.
                      "
                    /> */}
                      <span className="imageBorder">
                        <img src="/assets/images/blacklist domain.svg" alt="" loading="lazy"/>
                      </span>
                      <h5 className="card-title">Blacklist Domain</h5>
                      <p className="card-text">Look up Blacklist Domain</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span className="thinLine">
          <img
            src="/assets/images/thinLine.svg"
            width="auto"
            height="auto"
            alt="Line" loading="lazy"
          />
        </span>

        <span className="thinLine2">
          <img
            src="/assets/images/thinLine.svg"
            width="auto"
            height="auto"
            alt="Line" loading="lazy"
          />
        </span>

        <div className="zigzag2">
          <img
            src="/assets/images/shapeZigZag.svg"
            width="auto"
            height="auto"
            alt="shapeZigZag" loading="lazy"
          />
        </div>
      </div>
    </Suspense>
  );
};
export default ResourcesContainerNew;

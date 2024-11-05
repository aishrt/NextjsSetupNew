"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
const ResourcesContainer = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" || status === "loading" ? (
        ""
      ) : (
        <div className="resources wow fadeIn">
          <div className="thickLine">
            <img
              src="/assets/images/thickLine.svg"
              alt="Thick line used for design."
              width="auto" height="auto" loading="lazy"
            />
          </div>

          <div className="zigzag">
            <img
              src="/assets/images/shapeZigZag.svg"
              alt="ZigZag shape for designing."
              width="auto"
              height="auto" loading="lazy"
            />
          </div>

          <span className="dotted">
            <img
              src="/assets/images/shapeDotted.svg"
              alt="Shape dotted used for design."
              width="auto" height="auto" loading="lazy"
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
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                      <div className="card wow flipInX">
                    <Link rel="canonical" href="/tools/dmarc-lookup">
                        <div className="card-body">
                          {/* <img
                            className="card-image"
                            src="/assets/images/dmarcRecord.svg"
                            alt=""
                          /> */}
                          <span className="imageBorder">
                            <img src="/assets/images/DMARCRecord.webp" alt="" width="auto" height="auto" loading="lazy"/>
                          </span>
                          <h5 className="card-title">DMARC Record</h5>
                          <p className="card-text">
                            Look up and generate DMARC record
                          </p>
                        </div>
                    </Link>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                      <div className="card wow flipInX">
                    <Link rel="canonical" href="/tools/spf-lookup">
                        <div className="card-body">
                          {/* <img
                            className="card-image"
                            src="/assets/images/spfRecord.svg"
                            alt="Eye icon representing SPF record."
                            width="auto" height="auto"
                          /> */}
                          <span className="imageBorder">
                            <img src="/assets/images/SPF-Record.webp" width="auto" height="auto" alt="" loading="lazy"/>
                          </span>
                          <h5 className="card-title">SPF Record</h5>
                          <p className="card-text">
                            Look up and validate your SPF record
                          </p>
                        </div>
                    </Link>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                      <div className="card wow flipInX">
                    <Link rel="canonical" href="/tools/dkim-lookup">
                        <div className="card-body">
                          {/* <img
                            className="card-image"
                            src="/assets/images/dkimRecord.svg"
                            alt="Person with star logo for DKIM record lock." width="auto" height="auto"
                          /> */}
                          <span className="imageBorder">
                            <img src="/assets/images/DKIM record.webp" width="auto" height="auto" alt="" />
                          </span>
                          <h5 className="card-title">DKIM Record</h5>
                          <p className="card-text">Look up DKIM record</p>
                        </div>
                    </Link>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                      <div className="card wow flipInX">
                    <Link rel="canonical" href="/tools/bimi-lookup">
                        <div className="card-body">
                          {/* <img
                            className="card-image"
                            src="/assets/images/bimiRecord.svg"
                            alt="This logo is used to display authenticated emails."
                             width="auto" height="auto"  
                          /> */}
                          <span className="imageBorder">
                            <img src="/assets/images/BIMI-Record.webp" width="auto" height="auto" alt="" loading="lazy"/>
                          </span>
                          <h5 className="card-title">BIMI Record</h5>
                          <p className="card-text">Look up DKIM record</p>
                        </div>
                    </Link>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className="thinLine">
            <img src="/assets/images/thinLine.svg" width="auto" height="auto" alt="Line" loading="lazy"/>
          </span>

          <span className="thinLine2">
            <img src="/assets/images/thinLine.svg" width="auto" height="auto" alt="Line" loading="lazy"/>
          </span>

          <div className="zigzag2">
            <img src="/assets/images/shapeZigZag.svg" width="auto" height="auto" alt="shapeZigZag" loading="lazy"/>
          </div>
        </div>
      )}
    </>
  );
};
export default ResourcesContainer;

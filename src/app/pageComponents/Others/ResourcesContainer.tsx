"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { _IMG } from "@/constants/images";
import Image from "next/image";
const ResourcesContainer = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" || status === "loading" ? (
        ""
      ) : (
        <div className="resources wow fadeIn">
          <div className="thickLine">
            <Image
              src={_IMG.thickLine}
              alt="Thick line used for design."
              loading="lazy"
            />
          </div>

          <div className="zigzag">
            <Image
              src={_IMG.shapeZigZag}
              alt="ZigZag shape for designing."
              loading="lazy"
            />
          </div>

          <span className="dotted">
            <Image
              src={_IMG.shapeDotted}
              alt="Shape dotted used for design."
              loading="lazy"
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
                        
                          <span className="imageBorder">
                            <Image
                              src={_IMG.DMARCRecord}
                              alt=""
                              loading="lazy"
                            />
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
                        
                          <span className="imageBorder">
                            <Image src={_IMG.SPFRecord} alt="" loading="lazy" />
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
                        
                          <span className="imageBorder">
                            <Image src={_IMG.DKIM_record} alt="" />
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
                          <span className="imageBorder">
                            <Image
                              src={_IMG.BIMI_Record}
                              alt=""
                              loading="lazy"
                            />
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
            <Image src={_IMG.thinLine} alt="Line" loading="lazy" />
          </span>

          <span className="thinLine2">
            <Image src={_IMG.thinLine} alt="Line" loading="lazy" />
          </span>

          <div className="zigzag2">
            <Image src={_IMG.shapeZigZag} alt="shapeZigZag" loading="lazy" />
          </div>
        </div>
      )}
    </>
  );
};
export default ResourcesContainer;

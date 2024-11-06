import HeaderNew from "@/components/Layout/Header/HeaderNew";
import FeaturesContainer from "@/app/pageComponents/Others/FeaturesContainer";
import ResourcesContainerNew from "@/app/pageComponents/Others/ResourcesContainerNew";
import ScannerSection from "@/app/pageComponents/Others/ScannerSection";
import React, { Suspense } from "react";
import FooterContent from "@/components/Layout/Footer/FooterContent";
import { isEmpty } from "@/utils/isEmpty";
import AllToolsScannerResult from "../pageComponents/Tools/ui/AllToolsScannerResult";


type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DomainScanner = async ({ searchParams }: Props) => {
  let domain: string = (searchParams?.domain as string) || "";

  return (
    <>
      <div className="domainHeader">
        <HeaderNew />
      </div>

      <div className="">
        <div className="generatorSection__Result scanner">
          <Suspense>
            <div className="scannerFix">
              <ScannerSection
                scannerSectionClass={"domainScannerSection"}
                progressSpinner={true}
              />
            </div>
          </Suspense>
        </div>
        <div className="container" >
          {!isEmpty(domain) && (
            <>
              <AllToolsScannerResult domain={domain} />
            </>
          )}
          <FeaturesContainer />
          <div className="subscribe">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="subscribe__Form d-flex text-start">
                    <div className="col-xl-8 col-lg-8 col-md-12">
                      <h3>Take control of your domain</h3>
                      <p>
                        Discover how Valimail&apos;s high performance engine
                        eliminates DNS management and operates at scale to
                        authenticate billions of emails per day
                      </p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12">
                      <form className="justify-content-end mt-0">
                        <a href="/signup" className="btn main-button-dark">
                          Get Started
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <ResourcesContainerNew />
      </Suspense>
      <FooterContent />
    </>
  );
};
export default DomainScanner;

import { _IMG } from "@/constants/images";
import Image from "next/image";

const GenerateValidRecord = () => {
  return (
    <div className="recordSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="recordSection__Outer">
              <div className="row">
                <div className="col-lg-5">
                  <div className="Img">
                    <Image src={_IMG.recordImg} alt="records" loading="lazy" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="Content">
                    <h3>Generate Your Valid DMARC Record</h3>
                    <p>
                      Having a valid DMARC record in your DNS can be the
                      difference between a protected email infrastructure and
                      searching for means to pay a ransom to hackers. While you
                      can create a DMARC record manually (if you know the right
                      syntax), generating one with a DMARC record wizard is much
                      quicker, easier, and error-free. Using YOUR Dmarc&apos;s
                      DMARC record generator is the quickest way to obtain a
                      DMARC record that meets your specifications of the right
                      policy, reporting domains, and other optional tags.
                    </p>

                    <p>
                      DMARC record generator is helpful if YOUR DMARC checker
                      results show that yo&apos;re missing the record or it
                      contains any errors. It&apos;s also irreplaceable for
                      record updates during a policy change or adding more
                      report recipients. Once you generate the DMARC record,
                      you&apos;re just a step away from starting to monitor your
                      email environment. Placing the generated record in your
                      DNS will let you start digging into the domain
                      infrastructure and fixing all the issues one by one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenerateValidRecord;

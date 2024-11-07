import { useState, useEffect } from "react";
import { toolsData } from "@/constants/toolsData";
import { _IMG } from "@/constants/images";
import Image from "next/image";

type ToolProps = {
  toolName: string;
};

const ToolsUi = ({ toolName }: ToolProps) => {
  const [toolData, setToolData] = useState<
    (typeof toolsData)[keyof typeof toolsData] | null
  >(null);

  useEffect(() => {
    const matchedTool = toolsData[toolName as keyof typeof toolsData];
    if (matchedTool) {
      setToolData(matchedTool);
    }
  }, [toolName]);
  if (!toolData) {
    return <div></div>;
  }
  const { title, _section, details, features, benefits } = toolData;
  const featureColour = ["blue", "orange", "yellow2", "purple"];
  return (
    <div className="toolsContent mt-4">
      <div className="dmarcMatters">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="centerAlign2">
                <h3 style={{ fontWeight: "800" }}>{title}</h3>
                <p dangerouslySetInnerHTML={{ __html: _section }}></p>
              </div>
            </div>
            <div className="col-lg-6">
              <Image
layout="intrinsic" src={_IMG.reportingImage2} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div className="keyFeatures">
        <div className="container">
          <div className="innerSection mb-0">
            <h3
              style={{
                textAlign: "center",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              Key Features and Functionalities
            </h3>
            <p className="keyPara">
              Discover core features designed to enhance efficiency, security,
              and scalability with seamless integration
            </p>
            <div className="row">
              {features.map((feature, index) => (
                <div className="col-xl-3 col-lg-6" key={index}>
                  <div className={`featureSection ${featureColour[index]}`}>
                    <Image
layout="intrinsic" src={_IMG.roundCheck} alt="" loading="lazy" />
                    <h6>{feature.split(":")[0]}</h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: feature.split(":")[1]?.trim(),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {details.length > 0 ? (
        <div className="tableSection explanation generatorSection">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tableSection__Content">
                  <h3 className="text-center">DMARC Tag Explanations</h3>
                  <p className="text-center mb-5">
                    DMARC Record Checker will display the following tags.
                  </p>
                  <div className="table-responsive resultOuterCard">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>TAG</th>
                          <th>TAG DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details.map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.tag}</td>
                            <td>{detail.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="toolsBenefits">
        <div className="container">
          <div className="row">
            <h3>Tool Benefits & Enhancements</h3>
            <p className="text-center mb-5">
              Discover the key advantages and powerful upgrades that our tools
              bring to your email security strategy.
            </p>
            {benefits.map((benefit, index) => (
              <div className="col-lg-6" key={index}>
                <div className="innerSection">
                  <Image
layout="intrinsic" src={_IMG.sectool} alt="" loading="lazy" />
                  <div>
                    <h4>{benefit.split(":")[0]}</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: benefit.split(":")[1]?.trim(),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsUi;

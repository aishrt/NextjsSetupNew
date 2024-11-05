import { capitalize } from "@mui/material";
import { isEmpty } from "@/utils/isEmpty";
import React from "react";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
type Props = {
  domain: string;
  result: ScannerResultTypes;
  toolName: string;
  toolType: string;
  responseData: any;
};
const TagTable = ({
  result,
  domain,
  toolName,
  toolType,
  responseData,
}: Props) => {
  const list = responseData?.tag_details || [];
  return (
    <>
      {!isEmpty(list) ? (
        <div className="tableSection generatorSection mb-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tableSection__Content">
                  <h3 className="text-center mb-5">
                    {toolName.toUpperCase()} Tag Explanations
                  </h3>
                  <p>
                    {toolName.toUpperCase()} {capitalize(toolType)} will display
                    the following tags.
                  </p>

                  <div className="table-responsive resultOuterCard">
                    <table className="table table-bordered ">
                      <thead>
                        <tr>
                          <th>
                            TAG <InformationTooltip name="tool_mta_tls_table_tag" />
                          </th>
                          <th>
                            Tag Value
                            <InformationTooltip name="tool_mta_tls_table_tag_value" />
                          </th>
                          <th>
                            TAG DESCRIPTION
                            <InformationTooltip name="tool_mta_tls_table_tag_description" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list?.map((val: any, idx: number) => {
                          return (
                            <tr key={`tag_tr_${idx}`}>
                              <td>{val.tag}</td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  maxWidth: "300px",
                                }}
                              >
                                {val?.tag_value || "No record found"}
                              </td>
                              {/* <td>{val?.tag_value ? val?.tag_description:""}</td> */}
                              <td>{val?.tag_description}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default TagTable;

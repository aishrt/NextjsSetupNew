import CopyToClipboard from "@/components/Functions/CopyToClipboard";
import { isEmpty } from "@/utils/isEmpty";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { Button, Link, Tooltip } from "@mui/material";
type Props = {
  recordValue: string | string[] | undefined;
  titleText?: string | string[] | undefined;
  subTitleText?: any | undefined;
  validText?: string | string[] | undefined;
  rvpText?: string | string[] | undefined;
  hostName?: string;
  typeVal?: string;
  showSelector?: boolean;
  lookupType?: string;
};
const RecordValuesCompo = ({
  recordValue,
  lookupType,
  titleText,
  subTitleText,
  validText,
  rvpText,
  hostName,
  typeVal,
  showSelector,
}: Props) => {
  const records = typeof recordValue === "string" ? [recordValue] : recordValue;
  const title = typeof titleText === "string" ? [titleText] : titleText;
  const subTitle =
    typeof subTitleText === "string" ? [subTitleText] : subTitleText;
  const validInvalid = typeof validText === "string" ? [validText] : validText;

  const rvp = typeof rvpText === "string" ? [rvpText] : rvpText;

  const recordsAry = records
    ? records
    : lookupType == "tls-rpt-generator"
    ? records
    : [""];

  console.log("Record ===>", records);
  console.log("Title ===>", title);
  console.log("Records Array ===>", recordsAry);

  return (
    <div className="row gx-3">
      {!isEmpty(recordsAry) &&
        recordsAry?.map((value: string, idx: number) => {
          const getColorClass = (title: string | undefined) =>
            title
              ? ["valid", "active", "accept"].includes(title.toLowerCase())
                ? "success"
                : ["invalid", "reject", "no record found", "missing"].includes(
                    title.toLowerCase()
                  )
                ? "danger"
                : "light"
              : "";
          const getIconClass = (title: string | undefined) =>
            title
              ? ["valid", "active", "accept"].includes(title.toLowerCase())
                ? "fa-circle-check"
                : ["invalid", "reject", "no record found", "missing"].includes(
                    title.toLowerCase()
                  )
                ? "fa-times-circle"
                : ""
              : "";

          const tt =
            isEmpty(title) || isEmpty(title && title[idx]) ? "" : title?.[idx];

          const isPublicPrivateKey = ["Private key", "Public key"]?.includes(
            tt as string
          );

          console.log("isPublicPrivateKey ===> ", isPublicPrivateKey);
          console.log("TT ===>", tt);

          return (
            <>
              {tt != "Policy Mode" && (
                <>
                  {!isPublicPrivateKey && (
                    <>
                      <div className="recordsBox">
                        <h5 className="fw-bolder">
                          <div className="d-flex align-items-center justify-content-between">
                            <h4>{tt} </h4>
                            {tt == "Record Validation" && (
                              <InformationTooltip name="tool_mta_tls_record_validation" />
                            )}
                            {tt == "Policy Validation" && (
                              <InformationTooltip name="tool_mta_tls_policy_validation" />
                            )}
                            {/* {tt == "Policy Mode" && (
                              <InformationTooltip name="tool_mta_tls_policy_mode" />
                            )} */}
                            <span>
                              {isEmpty(validInvalid) ||
                              isEmpty(validInvalid && validInvalid[idx]) ? (
                                <></>
                              ) : (
                                <h5
                                  className={`valid-invalid ${getColorClass(
                                    validInvalid?.[idx]
                                  )}`}
                                >
                                  <i
                                    className={`fa ${getIconClass(
                                      validInvalid?.[idx]
                                    )}`}
                                  ></i>
                                  {validInvalid?.[idx]}
                                </h5>
                              )}
                            </span>
                          </div>
                        </h5>
                        <div className="recordValueBox mb-3 pe-3 d-block">
                          <div className="row_divider position-relative">
                            {tt != "Policy Validation" && (
                              <>
                                {hostName && (
                                  <p className="record_value row p-2">
                                    <span className="col-2">
                                      <b>Host</b>
                                    </span>
                                    <span className="col-8">{hostName}</span>
                                    <span className="col-2">
                                      <CopyToClipboard
                                        disabledButton={isEmpty(hostName)}
                                        entryText={hostName ? hostName : "Host"}
                                      />
                                    </span>
                                  </p>
                                )}

                                {showSelector && (
                                  <>
                                    {hostName && <hr className="my-2" />}

                                    <p className="record_value row p-2">
                                      <span className="col-2">
                                        <b>Selector</b>
                                      </span>
                                      <span className="col-8">
                                        {" "}
                                        {isEmpty(subTitle) ||
                                        isEmpty(subTitle && subTitle[idx]) ? (
                                          <>Selector not found!</>
                                        ) : (
                                          <p
                                            className="subtitle"
                                            dangerouslySetInnerHTML={{
                                              __html: subTitle[idx],
                                            }}
                                          />
                                        )}
                                      </span>

                                      <span className="col-2">
                                        {isEmpty(subTitle) ||
                                        isEmpty(subTitle && subTitle[idx]) ? (
                                          <>
                                            <div className="generateCodeBtn pt-4 text-start">
                                              <Link
                                                style={{ color: "#fff" }}
                                                href={`${lookupType}?domain=${hostName}`}
                                              >
                                                <Tooltip
                                                  title="Generate Record"
                                                  placement="top"
                                                >
                                                  <img src="/assets/images/record.svg" />
                                                </Tooltip>
                                              </Link>
                                            </div>
                                          </>
                                        ) : (
                                          <CopyToClipboard
                                            disabledButton={isEmpty(subTitle)}
                                            entryText={subTitle[idx]}
                                          />
                                        )}
                                      </span>
                                    </p>
                                  </>
                                )}
                                {typeVal && (
                                  <>
                                    <hr className="my-2" />
                                    <p className="record_value row p-2">
                                      <span className="col-2">
                                        <b>Type</b>
                                      </span>
                                      <span className="col-8">{typeVal}</span>
                                      <span className="col-2">
                                        <CopyToClipboard
                                          disabledButton={isEmpty(typeVal)}
                                          entryText={typeVal}
                                        />
                                      </span>
                                    </p>
                                  </>
                                )}
                                <hr className="my-2" />
                              </>
                            )}

                            <p className="record_value row p-2">
                              <span className="col-2">
                                <b>Record Value </b>
                              </span>
                              <span className="col-8">
                                {" "}
                                {value ? value : "Record value not found!"}
                              </span>

                              <span className="col-2">
                                {isEmpty(value) ? (
                                  <div className="generateCodeBtn pt-4 text-start">
                                    <Link
                                      style={{ color: "#fff" }}
                                      href={`${lookupType}?domain=${hostName}`}
                                    >
                                      <Tooltip
                                        title="Generate Record"
                                        placement="top"
                                      >
                                        <img src="/assets/images/record.svg" />
                                      </Tooltip>
                                    </Link>
                                  </div>
                                ) : (
                                  <CopyToClipboard
                                    disabledButton={isEmpty(value)}
                                    entryText={value}
                                  />
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {isPublicPrivateKey && (
                    <>
                      <div
                        className={isPublicPrivateKey ? `col-6` : `col-12`}
                        key={`'record_k${idx}`}
                      >
                        <div className="recordsBox">
                          <span className="d-flex justify-content-between align-items-center">
                            <span>
                              <h4 className="title">
                                {tt}
                                {tt == "Record Validation" && (
                                  <InformationTooltip name="tool_mta_tls_record_validation" />
                                )}
                                {tt == "Policy Validation" && (
                                  <InformationTooltip name="tool_mta_tls_policy_validation" />
                                )}
                                {tt == "Policy Mode" && (
                                  <InformationTooltip name="tool_mta_tls_policy_mode" />
                                )}
                              </h4>
                              {isEmpty(subTitle) ||
                              isEmpty(subTitle && subTitle[idx]) ? (
                                <></>
                              ) : (
                                <p
                                  className="subtitle"
                                  dangerouslySetInnerHTML={{
                                    __html: subTitle[idx],
                                  }}
                                />
                              )}
                            </span>
                            <span>
                              {isEmpty(validInvalid) ||
                              isEmpty(validInvalid && validInvalid[idx]) ? (
                                <></>
                              ) : (
                                <h5
                                  className={`valid-invalid ${getColorClass(
                                    validInvalid?.[idx]
                                  )}`}
                                >
                                  <i
                                    className={`fa ${getIconClass(
                                      validInvalid?.[idx]
                                    )}`}
                                  ></i>
                                  {validInvalid?.[idx]}
                                </h5>
                              )}
                            </span>
                          </span>

                          <p className="rvp">
                            {isEmpty(rvp) || isEmpty(rvp && rvp[idx])
                              ? "Record Value:"
                              : rvp?.[idx]}
                          </p>

                          <div className="recordValueBox">
                            <p className="record_value">
                              {isPublicPrivateKey && (
                                <>
                                  -----BEGIN RSA {tt?.toUpperCase()}-----
                                  <br />
                                </>
                              )}
                              {value ? value : "Record value not found!"}
                              {isPublicPrivateKey && (
                                <>
                                  <br />
                                  -----END RSA {tt?.toUpperCase()}-----
                                </>
                              )}
                            </p>
                            <CopyToClipboard
                              disabledButton={isEmpty(value)}
                              entryText={value}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          );
        })}
    </div>
  );
};
export default RecordValuesCompo;

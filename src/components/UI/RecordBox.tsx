"use client";

import { isEmpty } from "@/utils/isEmpty";
import CopyToClipboard from "@/components/Functions/CopyToClipboard";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
const RecordBox = ({
  tootlipName,
  heading,
  subHead1,
  subHead2,
  subHead3,
  text1,
  text2,
  text3,
}: {
  tootlipName?: any;
  heading: any;
  subHead1: any;
  subHead2: any;
  subHead3: any;
  text1: any;
  text2: any;
  text3: any;
}) => {
  return (
    <div className="recordsBox">
      <h5 className="fw-bolder">
        <div className="d-flex align-items-center justify-content-between">
          <h4>{heading} </h4>
          <InformationTooltip name={tootlipName} />
        </div>
      </h5>
      <div className="recordValueBox mb-3 pe-3 d-block">
        <div className="row_divider position-relative">
          <p className="record_value row p-2">
            <span className="col-2">
              <b>{subHead1}</b>
            </span>
            <span className="col-8">{text1}</span>
            <span className="col-2">
              <CopyToClipboard
                disabledButton={isEmpty(text1)}
                entryText={text1}
              />
            </span>
          </p>

          <hr className="my-2" />

          <p className="record_value row p-2">
            <span className="col-2">
              <b>{subHead2}</b>
            </span>
            <span className="col-8">{text2}</span>
            <span className="col-2">
              <CopyToClipboard
                disabledButton={isEmpty(text2)}
                entryText={text2}
              />
            </span>
          </p>

          <hr className="my-2" />

          <p className="record_value row p-2">
            <span className="col-2">
              <b>{subHead3}</b>
            </span>
            <span className="col-8">{text3}</span>
            <span className="col-2">
              <CopyToClipboard
                disabledButton={isEmpty(text3)}
                entryText={text3}
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RecordBox;

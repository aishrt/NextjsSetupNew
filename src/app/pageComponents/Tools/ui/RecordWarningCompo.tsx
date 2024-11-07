import React, { useState } from "react";
import { isEmpty } from "@/utils/isEmpty";
import { _IMG } from "@/constants/images";
import Image from "next/image";

type Props = {
  warningText: string | string[];
  isError?: boolean;
};

const RecordWarningCompo = ({ warningText, isError }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const isString = typeof warningText === "string";

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible && !isEmpty(warningText) ? (
    <div className={isError ? "errorAlerts mt-2" : "warningAlerts mt-5"}>
      <div
        className={`${
          isError ? "errorAlerts__Content" : "warningAlerts__Content"
        } align-items-start`}
      >
        <Image src={_IMG.warningIcon} alt="logo-vector" loading="lazy" />
        <div className="warningBox2">
          <h4>
            {!isString && warningText.length > 1 && warningText.length}
            {isError ? "Error" : "Warning"} Detected
          </h4>
          <ul className="ps-3 mt-3">
            {isString ? (
              <li>{warningText}</li>
            ) : (
              warningText.map((warning: string, idx: number) => (
                <li key={`warning_${idx}`} className="colourRed">
                  {warning}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {!isError ? (
        <Image
          className="crossIcon"
          src={_IMG.warningCross}
          alt="logo-vector"
          onClick={handleClose}
          loading="lazy"
        />
      ) : (
        ""
      )}
    </div>
  ) : (
    <></>
  );
};

export default RecordWarningCompo;

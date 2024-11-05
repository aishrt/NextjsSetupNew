import React, { useState } from "react";
import { isEmpty } from "@/utils/isEmpty";

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
        <img
          src="/assets/images/warningIcon.svg"
          alt="logo-vector"
          loading="lazy"
        />
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
        <img
          className="crossIcon"
          src="/assets/images/warningCross.svg"
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

// import {isEmpty} from "@/utils/isEmpty";

// type Props = {
//   warningText: string | string[];
//   isError?: boolean
// }
// const RecordWarningCompo = ({warningText, isError}: Props) => {
//   const isString = typeof warningText === "string";
//   return (
//     !isEmpty(warningText) ?
//       <div className={isError ? "errorAlerts mt-2" : "warningAlerts mt-5"}>
//         <div className={`${isError ? "errorAlerts__Content":"warningAlerts__Content"} align-items-start`}>
//           <img src="/assets/images/warningIcon.svg" alt="logo-vector"/>
//           <div className="warningBox2">
//             <h4>{!isString && warningText.length > 1 && warningText.length} {isError? "Error" : "Warning"} Detected</h4>
//             <ul className="ps-3 mt-3">
//               {isString ? <li>{warningText}</li>
//                 :
//                 warningText.map((warning: string, idx: number) => {
//                   return (
//                     <li key={`warning_${idx}`} className="colourRed">{warning}</li>
//                   )
//                 })
//               }
//             </ul>
//           </div>
//         </div>
//         <img className="crossIcon" src="/assets/images/warningCross.svg" alt="logo-vector"/>
//       </div>
//       :
//       <></>
//   )
// }
// export default RecordWarningCompo;

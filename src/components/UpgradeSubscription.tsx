import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "@/utils/store";
import dayjs from "dayjs";
import UpgradePlanComponent from "./UpgradePlanComponent";

interface UpgradeSubscriptionProps {
  text: string;
  isAnchor?: boolean;
  showIcon?: boolean;
  date?: any;
  cssVal?: any;
}

const UpgradeSubscription = ({
  text,
  isAnchor = false,
  showIcon = false,
  date,
  cssVal,
}: UpgradeSubscriptionProps) => {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };
  const { licenseValidation } = useStore();

  const historyDateData = licenseValidation.historyDate;
  if (licenseValidation.historyDate && date) {
    const updatedDate = dayjs(date);
    const [month, day, year] = historyDateData.split("/");
    const historyDate = dayjs(`${year}-${month}-${day}`);
    if (updatedDate.isBefore(historyDate)) {
      setShowUpgrade(true);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={showIcon ? <AddIcon /> : null}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setShowUpgrade(true);
        }}
        className={cssVal ? cssVal : "btn mainButton"}
      >
        {text || "Save"}
      </Button>

      {showUpgrade && (
        <UpgradePlanComponent
          initialOpenModal={showUpgrade}
          onClose={handleCloseUpgradePlan}
        />
      )}
    </>
  );
};

export default UpgradeSubscription;

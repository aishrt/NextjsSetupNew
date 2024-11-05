"use client"; // Make sure to keep this if you're using React Server Components

import { useEffect, useState } from "react";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { BootstrapTooltipUi } from "@/components/ui/BootstrapToolTip";

type Props = {
  entryText: string;
  disabledButton?: boolean;
};

const CopyToClipboard = ({ entryText, disabledButton = false }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 500);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isCopied]);

  const handleTooltipClose = () => {
    setIsCopied(false);
  };

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(entryText);
    setIsCopied(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <BootstrapTooltipUi
        title={!disabledButton ? (isCopied ? "Copied!" : "Copy") : ""}
        PopperProps={{ disablePortal: true }}
      >
        <span>
          <IconButton
            disabled={disabledButton}
            aria-label={"Copy"}
            onClick={handleCopyClick}
          >
            <ContentCopy />
          </IconButton>
        </span>
      </BootstrapTooltipUi>
    </ClickAwayListener>
  );
};

export default CopyToClipboard;

import { _TOOL_TYPES } from "@/constants/toolsData";
import { _TABS } from "@/constants/tabData";

import { removeAfter } from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";

export const getToolParams = (toolsId: string) => {
  const lastIndexOfType: number = toolsId.lastIndexOf("-");
  const toolType =
    (toolsId && toolsId.substring(lastIndexOfType + 1)) || _TOOL_TYPES.LOOKUP;
  const toolName =
    (toolsId && toolsId.substring(0, lastIndexOfType)) || "DMARC";

  let pageTitle = `DMARC tools`;
  switch (toolType) {
    case "lookup": {
      pageTitle = `${toolName.toUpperCase()} Record Lookup and Checker`;
      break;
    }
    case "generator": {
      pageTitle = `${toolName.toUpperCase()} Record Generator tools`;
      break;
    }
    case "checker": {
      pageTitle = `${toolName.toUpperCase()} Raw Checker tools`;
      break;
    }
    default: {
      break;
    }
  }

  return {
    toolsId,
    toolType,
    toolName,
    pageTitle,
  };
};

export const getToolsIdArray = () => {
  const tabs = _TABS;
  const toolsIdArray: { toolsId: string }[] = [];
  tabs.map((tab) => {
    tab.tabTools.map((tool) => {
      const toolTypeIndex: number = tool.href.lastIndexOf("/");
      const toolType =
        tool.href && removeAfter(tool.href.substring(toolTypeIndex + 1), "?");
      if (tool.href && !isEmpty(toolType)) {
        toolsIdArray.push({ toolsId: toolType });
      }
    });
  });
  return toolsIdArray;
};

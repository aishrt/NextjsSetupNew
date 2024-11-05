import { _DNS_ARRAY, _TOOL_TYPES } from "@/constants/toolsData";
import React from "react";
import { removeHttp } from "@/utils/string-conversion";
import { getToolParams } from "@/@core/toolsFunctions";
import { isEmpty } from "@/utils/isEmpty";
import { postFetcherLambda } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import dynamic from "next/dynamic";

const DnsTool = dynamic(() => import("@/app/pageComponents/Tools/DnsTool"), {
  ssr: false,
});
const DkimTool = dynamic(() => import("@/app/pageComponents/Tools/DkimTool"), {
  ssr: false,
});
const BimiTool = dynamic(() => import("@/app/pageComponents/Tools/BimiTool"), {
  ssr: false,
});
const MtaStsTool = dynamic(
  () => import("@/app/pageComponents/Tools/MtaStsTool"),
  {
    ssr: false,
  }
);
const TlsRptTool = dynamic(
  () => import("@/app/pageComponents/Tools/TlsRptTool"),
  {
    ssr: false,
  }
);
const BlacklistTool = dynamic(
  () => import("@/app/pageComponents/Tools/BlacklistTool"),
  {
    ssr: false,
  }
);
const DmarcTool = dynamic(
  () => import("@/app/pageComponents/Tools/DmarcTool"),
  {
    ssr: false,
  }
);
const SpfTool = dynamic(() => import("@/app/pageComponents/Tools/SpfTool"), {
  ssr: false,
});

type Props = {
  params: {
    toolsId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CheckerGeneratorSectionCompo({
  params,
  searchParams,
}: Props) {
  let domain: string | string[] =
    removeHttp(searchParams?.domain as string) || "";

  const { toolsId, toolType, toolName } = getToolParams(
    params?.toolsId as string
  );
  const result: any = {};
  let lookupData: any = {};
  if (toolType === _TOOL_TYPES.LOOKUP) {
    var obj = {
      domain_name: domain,
    };
    if (toolName.toUpperCase() === "DKIM") {
      const domainQry = !isEmpty(domain) ? `?domain=${domain}` : ``;
      const selectorQry =
        !isEmpty(domain) && !isEmpty(searchParams?.selector)
          ? `${searchParams?.selector}`
          : ``;
      const postData = {
        domain_name: domain,
        selector: selectorQry,
      };
      if (domain) {
        lookupData = !isEmpty(toolType)
          ? await postFetcherLambda(`/${toolsId}`, postData)
          : {};
      }
    } else if (
      _DNS_ARRAY.includes(toolName.toUpperCase()) ||
      toolName.toUpperCase() === "DNS"
    ) {
      lookupData = !isEmpty(domain)
        ? await postFetcherLambda(`/${API_ROUTES.DNS_LOOKUP}`, obj)
        : {};
    } else {
      lookupData = !isEmpty(domain)
        ? await postFetcherLambda(`/${toolsId}`, obj)
        : {};
    }
  }

  const HtmlCheckerGeneratorSection = () => {
    switch (toolName.toUpperCase()) {
      case _DNS_ARRAY.includes(toolName.toUpperCase())
        ? toolName.toUpperCase()
        : "DNS": {
        return (
          <DnsTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolName={toolName}
          />
        );
      }
      case "SPF": {
        return (
          <SpfTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
      case "DKIM": {
        return (
          <DkimTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
      case "BIMI": {
        return (
          <BimiTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
      case "MTA-STS": {
        return (
          <MtaStsTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
      case "TLS-RPT": {
        return (
          <TlsRptTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
      case "BLACKLIST-IP":
      case "BLACKLIST-DOMAIN": {
        return (
          <BlacklistTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolName={toolName}
          />
        );
      }
      default: {
        // DMARC,
        return (
          <DmarcTool
            result={result}
            lookupData={lookupData}
            searchParams={searchParams}
            toolsId={toolsId}
            toolType={toolType}
            toolName={toolName}
          />
        );
      }
    }
  };
  return (
    <>
      <HtmlCheckerGeneratorSection />
    </>
  );
}

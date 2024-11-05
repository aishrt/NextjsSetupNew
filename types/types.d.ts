type ScannerResultTypes = {
  DMARC: any;
  SPF: any;
  DKIM: any;
  BIMI: any;
  MTA: any;
  TLS: any;
  BLACKLIST?: any;
};
type BlacklistingPageProps = {
  result: ScannerResultTypes;
  toolName: string;
  searchParams: any;
  lookupData: any;
};
type DnsPageProps = {
  result: ScannerResultTypes;
  toolsId: string;
  toolName: string;
  searchParams: any;
  lookupData: any;
  searchStateProp?: any;
};
type toolPageProps = {
  result: ScannerResultTypes;
  toolsId: string;
  toolType: string;
  toolName: string;
  searchParams: any;
  lookupData: any;
};

type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

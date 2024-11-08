import { isOnboarded } from "@/@core/user-functions";
import TlsReportPage from "@/app/pageComponents/Dashboard/tlsRptPage";
import getCurrentUser from "@/lib/session";
import { removeHttp } from "@/utils/string-conversion";


export default async function Home({ searchParams }: SearchParamsProps) {
  const user = await getCurrentUser();
  if (!isOnboarded(user)) {
  }

  const domain = removeHttp(searchParams.domain as string);
  const startDate = searchParams.start_date
    ? removeHttp(searchParams.start_date as string)
    : null;
  const endDate = searchParams.end_date
    ? removeHttp(searchParams.end_date as string)
    : null;
  const page = searchParams.page ? removeHttp(searchParams.page as string) : 1;

  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        <TlsReportPage
          domain={domain}
          startDateProp={startDate}
          endDateProp={endDate}
          pageProp={page}
        />
      </div>
    </div>
  );
}

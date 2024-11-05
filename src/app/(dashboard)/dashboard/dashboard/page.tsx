import getCurrentUser from "@/lib/session";
import { isEmpty } from "@/utils/isEmpty";
import { isTokenExpired } from "@/@core/apiFetcher";
import { signOut } from "next-auth/react";
import AccountDashboardComponent from "../../../pageComponents/Dashboard/AccountDashboardComponent";

const Dashboard = async ({ searchParams }: SearchParamsProps) => {
  const users = await getCurrentUser();
  let page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  let page_size = searchParams.page_size
    ? parseInt(searchParams.page_size as string, 10)
    : 10;
  let searchQuery = searchParams.search_query
    ? (searchParams.search_query as string)
    : "";
  const isTokenValid = await isTokenExpired(users.token);
  if (!isTokenValid) {
    signOut({ callbackUrl: "/" });
    return;
  }
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  return (
    <>
      <AccountDashboardComponent
        page={page}
        page_size={page_size}
        searchQuery={searchQuery}
      />
    </>
  );
};
export default Dashboard;

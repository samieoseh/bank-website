import { Input } from "@/components/ui/input";
import withAuth from "@/withAuth";
import { useQuery } from "@tanstack/react-query";
import { LucideBell } from "lucide-react";
import useDashboardFetch from "./hooks/useDashboardFetch";
import { DashboardSummary } from "@/types/dashboard-summary";
import Card from "./components/Card";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import RecentActivitiesTable from "./components/RecentActivitiesTable";
import { RecentActivitiesType } from "@/types/recent-activities";

function DashboardPage() {
  const { getDashboardSummary, getRecentActivities } = useDashboardFetch();

  const { data, isLoading: isLoadingDashboardSummary } =
    useQuery<DashboardSummary>({
      queryKey: ["dashboard-summary"],
      queryFn: getDashboardSummary,
    });

  const { data: recentActivites, isLoading: isLoadingRecentActivities } =
    useQuery<RecentActivitiesType[]>({
      queryKey: ["recent-activities"],
      queryFn: getRecentActivities,
    });

  if (isLoadingDashboardSummary || isLoadingRecentActivities) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <header className="flex justify-between items-center">
        <h2 className="flex-1">Logo</h2>

        <div className="flex items-center space-x-4">
          <Input placeholder="Search" className="bg-[#fff]" />
          <LucideBell fill="#fff" />
        </div>
      </header>
      <div className="py-8">
        <h1 className="text-xl font-bold">
          Welcome Samuel!, system is running smoothly
        </h1>
        <div className="flex justify-between space-x-4 items-center py-8">
          <Card
            value={data?.totalRegisteredUsers}
            percentageIncrease={data?.percentageIncreaseInTotalRegisteredUsers}
            label="Total Registered Users"
          />
          <Card
            value={data?.totalActiveAccounts}
            percentageIncrease={data?.percentageIncreaseInTotalActiveAccounts}
            label="Total Active Accounts"
          />
          <Card
            value={data?.recentTransactions}
            percentageIncrease={data?.percentageIncreaseInRecentTransactions}
            label="Recent Transactions"
          />
          <Card
            value={data?.pendingApproval}
            percentageIncrease={data?.percentageIncreaseInPendingApproval}
            label="Pending Approval"
          />
        </div>
        <div className="py-4 flex flex-col justify-between space-y-8">
          <div className=" space-x-8 flex">
            <LineChart />
            <BarChart />
          </div>
          <div className=" space-x-8 flex">
            <PieChart />
            <LineChart />
          </div>
        </div>
        <div className="w-full py-4">
          <h3 className="text-xl py-2">Recent Activities</h3>
          <RecentActivitiesTable data={recentActivites} />
        </div>
      </div>
    </div>
  );
}
const DashboardPageWithAuth = withAuth(DashboardPage);

export default DashboardPageWithAuth;

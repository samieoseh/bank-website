import withAuth from "@/withAuth";

function DashboardPage() {
  return <div>Dashboard Page</div>;
}

const DashboardPageWithAuth = withAuth(DashboardPage);

export default DashboardPageWithAuth;

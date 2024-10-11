import withAuth from "@/withAuth";
import UsersTable from "./components/UsersTable";

function UserManagementPage() {
  return (
    <div className="w-full p-32">
      <UsersTable />
    </div>
  );
}

const UserManagementPageWithAuth = withAuth(UserManagementPage);

export default UserManagementPageWithAuth;

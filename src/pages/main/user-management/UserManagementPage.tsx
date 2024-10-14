import withAuth from "@/withAuth";
import UsersTable from "./components/UsersTable";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UserAddForm from "./components/UserAddForm";
import { useQuery } from "@tanstack/react-query";
import useUserFetch from "./hooks/useUserFetch";
import { useLocation } from "react-router-dom";

function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { getUsers } = useUserFetch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <UserAddForm />
        </div>
      </div>
      <div className="py-8">{!isLoading && <UsersTable data={data} />}</div>
    </div>
  );
}

const UserManagementPageWithAuth = withAuth(UserManagementPage);

export default UserManagementPageWithAuth;

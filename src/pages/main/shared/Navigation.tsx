import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import links from "./nav-links.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import { AuthContextType } from "@/types/user";

export default function Navigation() {
  const { user } = useAuth() as AuthContextType;
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState(location.pathname);

  const userSplit = user?.fullName.split(" ");
  const firstName = userSplit && userSplit[0];
  const lastName = userSplit && userSplit[1];

  const handleLinkClick = (url: string) => {
    setActiveUrl(url);
  };

  return (
    <nav className="space-y-8">
      <div className="px-4 flex space-x-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="font-bold text-sm">{user?.fullName.toUpperCase()}</p>
      </div>
      <ul className="space-y-2">
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link
              className={`w-full py-2 px-4 block text-sm rounded-md transition-colors duration-300 ease-in-out ${
                activeUrl === path
                  ? "text-white bg-[#2E8B6A]"
                  : "text-[#2d2d2d] hover:bg-gray-200"
              }`}
              to={path}
              onClick={() => handleLinkClick(path)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

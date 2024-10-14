import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import links from "./nav-links.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState(location.pathname);

  const handleLinkClick = (url: string) => {
    setActiveUrl(url);
  };

  return (
    <nav className="space-y-8">
      <div className="px-4 flex space-x-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold text-sm">JOHN DOE</p>
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

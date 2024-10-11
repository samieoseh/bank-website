import { Link } from "react-router-dom";
import { useState } from "react";
import links from "./nav-links.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  const [activeUrl, setActiveUrl] = useState("/user-management");

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
        <p className="font-bold">JOHN DOE</p>
      </div>
      <ul className="space-y-4">
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link
              className={`w-full py-2 px-4 block rounded-md transition-colors duration-300 ease-in-out ${
                activeUrl === path
                  ? "text-white bg-primary"
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

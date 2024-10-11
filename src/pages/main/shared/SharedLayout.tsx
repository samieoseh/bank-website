import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function SharedLayout() {
  return (
    <div>
      <div className="flex">
        <div className="w-[20%] h-screen overflow-hidden bg-[#FAFAFA] p-8">
          <Navigation />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

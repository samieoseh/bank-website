import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function SharedLayout() {
  return (
    <div>
      <div className="flex overflow-x-hidden">
        <div className="w-[20%] h-screen overflow-hidden bg-[#FAFAFA] p-8 fixed">
          <Navigation />
        </div>
        <div className="ml-[20%] w-[80%] p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

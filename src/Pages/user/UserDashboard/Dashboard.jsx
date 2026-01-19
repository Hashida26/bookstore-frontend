import { useState } from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Orders from "./Order";
import Cart from "./Usercart";


export default function Dashboard() {
  const [active, setActive] = useState("profile");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
      
      {/* LEFT SIDEBAR */}
      <Sidebar active={active} setActive={setActive} />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1">
        <div className="bg-gray-300 text-white border rounded-md p-8 min-h-[400px]">
          {active === "profile" && <Profile />}
          {active === "orders" && <Orders />}
          {active === "cart" && <Cart />}


        </div>
      </div>

    </div>
  );
}

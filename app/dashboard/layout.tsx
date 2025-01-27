"use client";

import { BiMenu } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/Sidebar";
import "react-toastify/dist/ReactToastify.css";

interface LProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: LProps) {
  const logoutUser = async () => {
    const request = await fetch("/api/auth", {method: "DELETE"});
    if (request.status == 200) {
      return location.href = "/auth";
    }
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center overflow-hidden">
        {/* Page content here */}
        <div className="navbar bg-white border-b border-l-none md:border-l">
          <div className="flex-1">
            <label htmlFor="sidebar" className="drawer-button lg:hidden">
              <BiMenu size={30} />
            </label>
            <span className="text-xl font-bold ml-3">Dashboard</span>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li><a>Settings</a></li>
                <li>
                  <button onClick={logoutUser}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white border-l-none md:border-l w-full flex-1 overflow-auto p-3">{props.children}</div>
      </div>
      <Sidebar />
      <ToastContainer />
    </div>
  )
}
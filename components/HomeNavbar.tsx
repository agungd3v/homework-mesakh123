"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state: any) => state.user);

  const logoutUser = async () => {
    const request = await fetch("/api/auth", {method: "DELETE"});
    if (request.status == 200) {
      return location.href = "/";
    }
  }

  return (
    <div className="navbar bg-transparent px-0 pt-0 md:pt-16 md:px-48 relative">
      <div className="flex-1">
        <Link href={"/"} className="font-bold text-white bg-blue-600 text-2xl pl-3 pr-1 rounded">Homework</Link>
      </div>
      <div className="flex-none">
        {user.user && <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link href={"/dashboard"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li>
              <span onClick={logoutUser}>Logout</span>
            </li>
          </ul>
        </div>}
        {!user.user && <Link
          href={"/auth"}
          className="font-bold text-white bg-blue-600 border-blue-600 border rounded px-3 py-2 text-sm mr-3"
        >
          Login / Register
        </Link>}
      </div>
    </div>
  );
}
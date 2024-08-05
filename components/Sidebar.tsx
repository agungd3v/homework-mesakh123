"use client";

import { rts } from "@/app/routes/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const path = usePathname();

  const user = useSelector((state: any) => state.user);
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    if (user.user) {
      const r = rts.filter((a: any) => a.role == user.user.role);
      setMenus(r);
    }
  }, [user]);

  return (
    <div className="drawer-side">
      <label htmlFor="sidebar" className="drawer-overlay"></label>
      <ul className="menu cusmenu !p-0 bg-white min-h-full w-80 p-4">
        {/* Sidebar content here */}
        {menus.map((data: any, index: number) => {
          return (
            <li key={index}>
              <Link
                href={data.path}
                className={`rounded-none py-3 px-5 ${path == data.path ? "active" : ""}`}
              >
                {data.label}
              </Link>
            </li>
          );
        })}
        <div className="flex items-end flex-1 p-5">
          <Link href={"/"} className="text-xl w-full text-blue-600 font-bold rounded-xl">Homework</Link>
        </div>
      </ul>
    </div>
  );
}
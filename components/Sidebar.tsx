"use client";

import { rts } from "@/app/routes/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state: any) => state.user);
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const r = rts.filter((a: any) => a.role == user.data.role);
    setMenus(r);
  }, [user]);

  return (
    <div className="drawer-side">
      <label htmlFor="sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-white min-h-full w-80 p-4">
        {/* Sidebar content here */}
        {menus.map((data: any, index: number) => {
          return (
            <li key={index}>
              <Link href={data.path}>{data.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
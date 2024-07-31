"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastError } from "@/plugins/toasification";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [register, setRegister] = useState<any>({
    name: "",
    username: "",
    password: "",
    role: "0",
    active: "1"
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeData = (value: string, prefix: string) => {
    setRegister((prevState: any) => ({
      ...prevState,
      [prefix]: value
    }));
  }

  const registerFunc = async () => {
    setLoading(true);

    try {
      const request = await axios.post("/api/auth/register", {
        data: register
      });
      if (request.status == 200) {
        router.push("/auth");
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoading(false);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-2">
      <div className="w-full md:max-w-[360px] p-3 rounded border">
        <h3 className="font-bold text-lg">Register</h3>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm">Name</label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className="w-full border px-3 py-2 outline-none rounded"
              placeholder="Type name"
              onChange={(v: any) => changeData(v.target.value, "name")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              className="w-full border px-3 py-2 outline-none rounded"
              placeholder="Type username"
              onChange={(v: any) => changeData(v.target.value, "username")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              className="w-full border px-3 py-2 outline-none rounded"
              placeholder="Type password"
              onChange={(v: any) => changeData(v.target.value, "password")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-sm">Role</label>
            <select
              id="role"
              className="w-full border px-3 py-2 outline-none rounded"
              onChange={(v: any) => changeData(v.target.value, "role")}
            >
              <option value="0">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">Viewer</option>
            </select>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="bg-blue-600 text-white w-full py-3.5 font-bold rounded text-sm"
              onClick={registerFunc}
              disabled={loading}
            >
              {loading ? "Register..." : "Register"}
            </button>

            <Link href={"/auth"} className="w-full text-sm text-blue-600 font-semibold flex py-3.5 items-center justify-center">Login</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
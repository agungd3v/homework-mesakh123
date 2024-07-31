"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastError } from "@/plugins/toasification";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [login, setLogin] = useState<any>({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeData = (value: string, prefix: string) => {
    setLogin((prevState: any) => ({
      ...prevState,
      [prefix]: value
    }));
  }

  const loginFunc = async () => {
    setLoading(true);

    try {
      const request = await axios.post("/api/auth", {
        data: login
      });
      if (request.status == 200) {
        location.href = "/dashboard";
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoading(false);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-2">
      <div className="w-full md:max-w-[360px] p-3 rounded border">
        <h3 className="font-bold text-lg">Login</h3>
        <div className="flex flex-col gap-3 mt-5">
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
          <div className="mt-5">
            <button
              type="button"
              className="bg-blue-600 text-white w-full py-3.5 font-bold rounded text-sm"
              onClick={loginFunc}
              disabled={loading}
            >
              {loading ? "Login..." : "Login"}
            </button>
            <Link href={"/auth/register"} className="w-full flex text-sm font-semibold text-blue-600 py-3.5 items-center justify-center">Register</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
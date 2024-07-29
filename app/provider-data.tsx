"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

interface PDProps {
  children: React.ReactNode;
  session: any;
}

export default function ProviderData({children, session}: PDProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
    }
  }, [session]);

  return <>{children}</>;
}
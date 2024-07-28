import { logout } from "@/app/utils/session";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  await logout();

  return NextResponse.json(
    {message: "Logout successfully"},
    {status: 200}
  );
}

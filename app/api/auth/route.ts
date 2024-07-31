import { NextResponse } from "next/server";
import { generateSession, logout } from "@/app/utils/session";
import database from "@/database";

export async function DELETE(request: Request) {
  await logout();

  return NextResponse.json(
    {message: "Logout successfully"},
    {status: 200}
  );
}

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const {data} = requestData;

    const getData = new Promise((resolve, reject) => {
      database.users.findOne(
        {username: data.username, password: data.password},
        (err: any, doc: any) => resolve(doc)
      );
    });
    const user = await getData;
    if (!user) throw "User not found!";

    const generate = await generateSession(user);
    if (!generate) throw "Error, generating cookie";

    return NextResponse.json(
      {message: "Login successfully"},
      {status: 200}
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}
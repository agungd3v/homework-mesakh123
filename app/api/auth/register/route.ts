import database from "@/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const {data} = requestData;

    if (data.name == "") throw "Name cannot be empty";
    if (data.username == "") throw "Username cannot be empty";
    if (data.password == "") throw "Password cannot be empty";
    if (data.role == "0") throw "Role cannot be empty";

    await database.users.insert(data);

    return NextResponse.json(
      {message: "Register successfully"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }

}
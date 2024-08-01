import { NextRequest, NextResponse } from "next/server";
import database from "@/database";

export async function GET(request: NextRequest) {
  try {
    const getData = new Promise((resolve, reject) => {
      database.users.find({$not: {role: "1"}}, (err: any, docs: any) => resolve(docs));
    });
    let data: any = await getData;

    const searchParam = request.nextUrl.searchParams.get("search") ?? "";
    const search = new RegExp(searchParam, "i");

    data = data.filter((ab: any, index: any) => search.test(ab.username));

    return NextResponse.json(
      {message: data},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

export async function PUT(request: Request) {
  try {
    const requestData = await request.json();
    const {data} = requestData;

    const updateStatus = new Promise((resolve, reject) => {
      database.users.update(
        {_id: data.id},
        {$set: {
          "active": data.status
        }},
        {},
        (err: any, replaced: any) => resolve(replaced)
      );
    });
    // const updated: any = await updateStatus;
    // if (updated < 1) throw "Error, change status";

    return NextResponse.json(
      {message: "Updated status OK!"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import database from "@/database";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    const getData = new Promise((resolve, reject) => {
      database.users.findOne({_id: params.id}, (err: any, docs: any) => resolve(docs));
    });
    const data = await getData;
    if (!data) throw "Error, user not found";

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

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  try {
    const requestData = await request.json();
    const {data} = requestData;

    const updateData = new Promise((resolve, reject) => {
      database.users.update(
        {_id: params.id},
        {$set: {...data}},
        {},
        (err: any, docs: any) => resolve(docs)
      );
    });
    const userUpdate: any = await updateData;
    if (userUpdate < 1) throw "Error, user not found";

    return NextResponse.json(
      {message: "Update user successfully!"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}
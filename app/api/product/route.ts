import { NextRequest, NextResponse } from "next/server";
import database from "@/database";

export async function GET(request: NextRequest) {
  try {
    const param = request.nextUrl.searchParams.get("search");
    let query = {};

    if (param) {
      query = {product_name: param};
    }

    const getData = new Promise((resolve, reject) => {
      database.products.find(
        query,
        (err: any, docs: any) => resolve(docs)
      );
    });
    const data = await getData;

    return NextResponse.json(
      {message: data},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error.message},
      {status: 400}
    );
  }
}

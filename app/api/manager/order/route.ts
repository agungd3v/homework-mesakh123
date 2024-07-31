import { NextRequest, NextResponse } from "next/server";
import database from "@/database";

export async function GET(request: NextRequest) {
  try {
    let query = {};

    const requestStatus = request.nextUrl.searchParams.get("status");
    if (requestStatus) {
      if (requestStatus == "undefined") {
        query = {};
      } else {
        if (requestStatus == "0") {
          query = {};
        } else {
          query = {status: parseInt(requestStatus)}
        }
      }
    }

    const getOrders = new Promise((resolve, reject) => {
      database.orders.find(query, (err: any, docs: any) => resolve(docs));
    });
    const orders = await getOrders;

    return NextResponse.json(
      {message: orders},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

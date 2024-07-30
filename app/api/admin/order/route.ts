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

export async function PUT(request: Request) {
  try {
    const requestData = await request.json();

    const getOrder = new Promise((resolve, reject) => {
      database.orders.findOne({_id: requestData.data.id}, (err: any, doc: any) => resolve(doc));
    });

    const order: any = await getOrder;
    if (!order) throw "Error, order not found";
    if (order.status > 2) throw "Error, order was complete";

    const updateOrder = new Promise((resolve, reject) => {
      database.orders.update(
        {_id: requestData.data.id},
        {$set: {
          status: order.status + 1
        }},
        {},
        (err: any, replaced: any) => resolve(replaced)
      );
    });

    const update: any = await updateOrder;
    if (update < 1) throw "Error, failed change status";

    return NextResponse.json(
      {message: "Success update status"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}
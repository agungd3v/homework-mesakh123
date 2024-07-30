import { NextRequest, NextResponse } from "next/server";
import database from "@/database";
import { getSession } from "@/app/utils/session";

export async function POST(request: Request) {
  try {
    const session: any = await getSession();
    const requestData = await request.json();

    const getData = new Promise((resolve, reject) => {
      database.products.findOne({_id: requestData.data.id}, (err: any, docs: any) => resolve(docs));
    });

    const product: any = await getData;
    if (!product) throw "Error, product not found";
    if (!session) throw "Error, user not found";

    const document = {
      user_id: session.user.id,
      product_id: product._id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_image: product.product_image,
      quantity: requestData.data.quantity,
      total: parseInt(product.product_price) * parseInt(requestData.data.quantity),
      status: 1
    }
    await database.orders.insert(document);

    return NextResponse.json(
      {message: "Order succefully"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session) throw "Error, user not found";

    let query = {};

    const requestStatus = request.nextUrl.searchParams.get("status");
    if (requestStatus) {
      if (requestStatus == "undefined") {
        query = {user_id: session.user.id};
      } else {
        if (requestStatus == "0") {
          query = {user_id: session.user.id};
        } else {
          query = {user_id: session.user.id, status: parseInt(requestStatus)}
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
    )
  }
}
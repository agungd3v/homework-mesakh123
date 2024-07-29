import { NextResponse } from "next/server";
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
      user_id: session.user.name,
      product_id: product._id,
      quantity: requestData.data.quantity,
      total: parseInt(product.product_price) * parseInt(requestData.data.quantity)
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

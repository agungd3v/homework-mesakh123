import { deleteImage, storeImage } from "@/app/utils/fileHandler";
import { NextResponse } from "next/server";
import database from "@/database";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const storeFile = await storeImage(data.get("product_image") as File);
    if (!storeFile.status) throw (storeFile.message);

    const document = {
      product_name: data.get("product_name"),
      product_price: data.get("product_price"),
      product_image: storeFile.message
    };
    await database.products.insert(document);

    return NextResponse.json(
      {message: document},
      {status: 200}
    )
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

export async function PUT(request: Request) {
  try {
    const {id} = await request.json();

    const getData = new Promise((resolve, reject) => {
      database.products.findOne({_id: id}, (err: any, doc: any) => resolve(doc));
    });
    const data: any = await getData;

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

export async function PATCH(request: Request) {
  try {
    const requestData = await request.json();

    const updateData = new Promise((resolve, reject) => {
      database.products.update(
        {_id: requestData.data.id},
        {$set: {
          "product_name": requestData.data.product_name,
          "product_price": requestData.data.product_price
        }},
        {},
        (err: any, numUpdated: any) => resolve(numUpdated)
      );
    });
    const getUpdated: any = await updateData;
    if (getUpdated < 1) throw "error updated data";

    return NextResponse.json(
      {message: "Update data oke!"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

export async function GET(request: Request) {
  try {
    const getData = new Promise((resolve, reject) => {
      database.products.find({}, (err: any, docs: any) => resolve(docs));
    });
    const data = await getData;

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

export async function DELETE(request: Request) {
  try {
    const {id} = await request.json();

    const getData = new Promise((resolve, reject) => {
      database.products.findOne({_id: id}, (err: any, doc: any) => resolve(doc));
    });
    const data: any = await getData;

    const deleteFile = await deleteImage(data.product_image as string);
    if (!deleteFile.status) throw (deleteFile.message);

    const deleteData: any = new Promise((resolve, reject) => {
      database.products.remove({_id: id}, {}, (err: any, numRemoved: any) => resolve(numRemoved));
    });
    const getDeleted = await deleteData;
    if (getDeleted < 1) throw "error deleted data";

    return NextResponse.json(
      {message: "Delete data oke!"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {message: error},
      {status: 400}
    );
  }
}

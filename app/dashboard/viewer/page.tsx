"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toastError, toastSuccess } from "@/plugins/toasification";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function DashboardViewer() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loadBuy, setLoadBuy] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const getProduct = async () => {
    setLoading(true);

    try {
      const request = await axios.get("/api/viewer/product");
      if (request.status == 200) {
        setProducts(request.data.message);
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  }

  const setSelected = (id: string, name: string, price: string, image: string) => {
    setProductId(id);
    setProductName(name);
    setProductPrice(price);
    setProductImage(image);
    setQuantity(1);
  }

  const orderProduct = async (product: any) => {
    setLoadBuy(true);

    try {
      const request = await axios.post("/api/viewer/order", {
        data: {id: productId, quantity: quantity}
      });
      if (request.status) {
        toastSuccess(request.data.message);
        setModal(false);
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoadBuy(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && Array(4).fill(undefined).map((d: any, i: number) => {
          return (
            <div key={i} className="">
              <div className="skeleton rounded h-[200px] mb-3 w-full"></div>
              <div className="skeleton rounded-none h-6 w-2/3"></div>
              <div className="skeleton rounded-none h-8 w-1/2 mt-3"></div>
            </div>
          )
        })}
        {!loading && products.map((d: any, i: number) => {
          return (
            <div key={i} className="rounded border shadow overflow-hidden">
              <Image
                src={`/images/${d.product_image}`}
                width={0}
                height={0}
                className="w-full h-[200px] object-cover object-top"
                alt=""
              />
              <div className="p-3">
                <div className="mb-3">{d.product_name}</div>
                <div className="text-lg font-bold">Rp. {Intl.NumberFormat("id-ID").format(parseInt(d.product_price))}</div>
                <div className="mt-3">
                  <label
                    htmlFor="buy_product"
                    className="bg-blue-600 block text-white flex items-center justify-center h-12 rounded-lg font-bold cursor-pointer"
                    onClick={() => setSelected(d._id, d.product_name, d.product_price, d.product_image)}
                  >
                    Buy
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <input type="checkbox" id="buy_product" checked={modal} onChange={(v: any) => setModal(v.target.checked)} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{productName}</h3>
          <div className="flex justify-center items-center my-3">
            {productImage && <Image src={`/images/${productImage}`} width={200} height={200} alt="" />}
          </div>
          <div className="font-bold text-sm">
            Price:
            <br />
            <span className="text-lg text-blue-600">Rp. {Intl.NumberFormat("id-ID").format(parseInt(productPrice) * quantity)}</span>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="w-[26px] h-[26px] rounded bg-red-600 flex items-center justify-center"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <BiMinus size={18} color="#FFF" />
              </button>
              <div className="w-6 flex justify-center items-center text-lg font-bold">{quantity}</div>
              <button
                type="button"
                className="w-[26px] h-[26px] rounded bg-green-600 flex items-center justify-center"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <BiPlus size={18} color="#FFF" />
              </button>
              <button
                type="button"
                className="text-sm px-3 py-2 text-white rounded bg-blue-600"
                onClick={orderProduct}
                disabled={loadBuy}
              >
                {loadBuy ? "Buying..." : "Buy Product"}
              </button>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="buy_product">Close</label>
      </div>
    </>
  );
}

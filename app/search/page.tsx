"use client";

import axios from "@/plugins/request";
import { toastError, toastSuccess } from "@/plugins/toasification";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiShoppingBag, BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchPage() {
  const user = useSelector((state: any) => state.user.data);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loadBuy, setLoadBuy] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [orderItem, setOrderItem] = useState<number>(0);

  const jumpSearch = (key: any) => {
    if (key.which == 13) {
      router.push(`/search?q=${search}`);
    }
  }

  const getItems = async (search: string) => {
    try {
      const request = await axios.get(`/product?search=${search}`);
      if (request.status == 200) {
        setItems(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getOrders = async () => {
    try {
      const request = await axios.get("/viewer/order");
      if (request.status == 200) {
        setOrderItem(request.data.message.length);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setSelected = (id: string, name: string, price: string, image: string) => {
    setProductId(id);
    setProductName(name);
    setProductPrice(price);
    setProductImage(image);
    setQuantity(1);
  }

  const orderProduct = async (product: any) => {
    if (user) {
      setLoadBuy(true);
  
      try {
        const request = await axios.post("/viewer/order", {
          data: {id: productId, quantity: quantity}
        });
        if (request.status) {
          toastSuccess(request.data.message);
          setOrderItem(orderItem + 1);
          setModal(false);
        }
      } catch (error: any) {
        toastError(error.response.data.message);
      }
  
      setLoadBuy(false);
    } else {
      router.push("/auth");
    }
  }

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
    getItems(searchParams.get("q") ?? "");
    getOrders();
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      <div className="w-full h-48 bg-blue-600 flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <div className="text-center text-white mb-5 text-2xl font-bold flex justify-center items-center gap-3">
            Homework
            {orderItem > 0 && <Link href={"/dashboard/viewer/order"} className="relative">
              <BiShoppingBag size={30} />
              <div className="absolute rounded text-xs bg-red-600 w-[15px] h-[15px] bottom-0 right-0">{orderItem}</div>
            </Link>}
          </div>
          <div className="py-3 bg-white px-5 rounded-full">
            <input
              type="text"
              autoComplete="off"
              className="outline-none w-full"
              placeholder="Search product..."
              defaultValue={search}
              onChange={(v: any) => setSearch(v.target.value)}
              onKeyDown={jumpSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="px-3 py-10 w-full md:w-3/4">
          <span className="text-xl font-bold">Product List</span>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item: any, index: number) => {
              return (
                <div key={index} className="border shadow rounded-lg overflow-hidden">
                  <div className="w-full h-52">
                    <Image src={`/images/${item.product_image}`} width={0} height={0} className="w-full h-52 object-cover object-top" alt={item.product_name} />
                  </div>
                  <div className="px-3 py-4">
                    <h1 className="text-sm font-bold truncate">{item.product_name}</h1>
                    <h3 className="text-blue-600 text-lg pt-2">Rp{Intl.NumberFormat("id-ID").format(parseInt(item.product_price))}</h3>
                    <div className="mt-1">
                      <label
                        htmlFor="buy_product"
                        className="bg-blue-600 block text-white flex items-center justify-center h-12 rounded-lg font-bold cursor-pointer"
                        onClick={() => setSelected(item._id, item.product_name, item.product_price, item.product_image)}
                      >
                        Buy
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      <ToastContainer />
    </div>
  );
}
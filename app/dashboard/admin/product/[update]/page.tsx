"use client";

import { toastError } from "@/plugins/toasification";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminProductUpdate() {
  const router = useRouter();
  const params = useParams<{update: string}>();

  const [product, setProduct] = useState({
    product_name: "",
    product_price: ""
  });

  const updateProduct = async () => {
    try {
      const request = await axios.patch("/api/admin/product", {
        data: {
          id: params.update,
          product_name: product.product_name,
          product_price: product.product_price
        }
      });
      if (request.status == 200) {
        return router.back();
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }
  }

  const getDataProduct = async () => {
    const request = await axios.put("/api/admin/product", {id: params.update});
    if (request.status == 200) {
      setProduct({
        product_name: request.data.message.product_name,
        product_price: request.data.message.product_price
      });
    }
  }

  const changeProductData = (e: any, prefix: string) => {
    setProduct((prevState: any) => ({
      ...prevState,
      [prefix]: e.target.value
    }));
  }

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="flex flex-col gap-4 mx-0 md:mx-40 lg:mx-52">
      <div className="text-lg font-bold mb-3 mt-5">Update Product</div>
      <div className="flex flex-col gap-2">
        <label htmlFor="product_name" className="text-sm">Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          className="border w-full text-sm h-[48px] px-3 outline-none rounded"
          autoComplete="off"
          id="product_name"
          value={product.product_name}
          onChange={(e) => changeProductData(e, "product_name")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="product_price" className="text-sm">Product Price</label>
        <input
          type="text"
          placeholder="Product price"
          className="border w-full text-sm h-[48px] px-3 outline-none rounded"
          autoComplete="off"
          id="product_price"
          value={product.product_price}
          onChange={(e) => changeProductData(e, "product_price")}
        />
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-5 rounded"
          onClick={updateProduct}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
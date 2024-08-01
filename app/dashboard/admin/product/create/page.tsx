"use client";

import { toastError, toastSuccess } from "@/plugins/toasification";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Cleave from "cleave.js/react";
import axios from "@/plugins/request";

export default function AdminProductCreate() {
  const router = useRouter();

  const [product, setProduct] = useState({
    product_name: "",
    product_price: ""
  });
  const imageRef: any = useRef(null);

  const storeProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_price", product.product_price.split(".").join(""));
      formData.append("product_image", imageRef.current.files[0]);

      const request = await axios.post("/admin/product", formData);
      if (request.status == 200) {
        toastSuccess(request.data.message);
        return router.back();
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }
    
  }

  const changeProductData = (e: any, prefix: string) => {
    setProduct((prevState: any) => ({
      ...prevState,
      [prefix]: e.target.value
    }));
  }

  return (
    <div className="flex flex-col gap-4 mx-0 md:mx-40 lg:mx-52">
      <div className="text-lg font-bold mb-3 mt-5">Form Product</div>
      <div className="flex flex-col gap-2">
        <label htmlFor="product_name" className="text-sm">Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          className="border w-full text-sm h-[48px] px-3 outline-none rounded"
          autoComplete="off"
          id="product_name"
          onChange={(e) => changeProductData(e, "product_name")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="product_price" className="text-sm">Product Price</label>
        <Cleave
          options={{
            numeral: true,
            numeralDecimalMark: "thousand",
            delimiter: ".",
            numeralPositiveOnly: true
          }}
          placeholder="Product price"
          className="border w-full text-sm h-[48px] px-3 outline-none rounded"
          autoComplete="off"
          id="product_price"
          onChange={(e) => changeProductData(e, "product_price")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="product_image" className="text-sm">Product Image</label>
        <input
          type="file"
          placeholder="Product price"
          className="border w-full text-sm py-3 px-3 outline-none rounded"
          autoComplete="off"
          id="product_image"
          ref={imageRef}
        />
      </div>
      <div className="mt-5">
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-5 rounded"
          onClick={storeProduct}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
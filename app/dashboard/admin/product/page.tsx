"use client";

import ProductTable from "@/components/ProductTable";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProduct() {
  const [data, setData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);

  const getProduct = async () => {
    setLoadData(true);

    try {
      const request = await axios.get("/api/admin/product");
      if (request.status == 200) {
        setData(request.data.message);
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoadData(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div className="mt-2 mb-5">
        <Link
          href={"/dashboard/admin/product/create"}
          className="text-sm bg-blue-600 text-white py-2 px-3 rounded"
        >
          Create Product
        </Link>
      </div>
      <ProductTable data={data} loading={loadData} callback={getProduct} />
    </div>
  )
}
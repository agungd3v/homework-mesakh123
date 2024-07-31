"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ManagerOrder() {
  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const statuses = [
    {label: "All Status", value: 0},
    {label: "Pending", value: 1},
    {label: "Process", value: 2},
    {label: "Complete", value: 3},
  ];

  const getOrders = async () => {
    setLoading(true);

    try {
      const request = await axios.get(`/api/manager/order?status=${status}`);
      if (request.status == 200) {
        setData(request.data.message);
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  }

  const changeOrderStatus = (param: number) => {
    setStatus(param);
  }

  useEffect(() => {
    getOrders();
  }, [status]);

  return (
    <div className="border">
      <div className="border-b p-3 flex items-center gap-2">
        {statuses.map((s: any, i: number) => {
          return (
            <button
              key={i}
              type="button"
              className={`text-sm h-9 px-5 rounded ${s.value == status ? "bg-blue-400 text-white" : "bg-gray-100"}`}
              onClick={() => changeOrderStatus(s.value)}
            >
              {s.label}
            </button>
          );
        })}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center">Loading...</td>
              </tr>
            )}
            {!loading && (
              <>
                {data.length > 0 && data.map((ab: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Image
                          src={`/images/${ab.product_image}`}
                          width={0}
                          height={0}
                          className="w-[100px] h-[100px] object-cover"
                          alt=""
                        />
                      </td>
                      <td>{ab.product_name}</td>
                      <td>Rp{Intl.NumberFormat("id-ID").format(parseInt(ab.product_price))}</td>
                      <td>
                        <span className="font-bold">(x{ab.quantity})</span>
                        <span className="font-bold ml-2">Rp{Intl.NumberFormat("id-ID").format(ab.total)}</span>
                      </td>
                      <td>
                        {ab.status == 1 && (
                          <span className="py-1.5 px-3 rounded text-white bg-blue-600">
                            Pending
                          </span>
                        )}
                        {ab.status == 2 && (
                          <span className="py-1.5 px-3 rounded text-white bg-yellow-600">
                            Process
                          </span>
                        )}
                        {ab.status == 3 && (
                          <span className="py-1.5 px-3 rounded text-white bg-green-600">
                            Complete
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {data.length < 1 && (
                  <tr>
                    <td colSpan={5} className="text-center">Data not found</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
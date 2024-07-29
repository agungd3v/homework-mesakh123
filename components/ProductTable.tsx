import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CProps {
  data: any[];
  loading: boolean;
  callback(): void;
}

export default function ProductTable(param: CProps) {
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  const setDeleted = (id: string, name: string) => {
    setProductId(id);
    setProductName(name);
  }

  const deleteData = async () => {
    const request = await axios.delete("/api/admin/product", {
      data: {id: productId}
    });
    if (request.status == 200) {
      param.callback();
    }
  }

  return (
    <>
      <div className="border rounded overflow-hidden">
        <div className="flex items-center justify-between border-b py-2 px-3">
          <div className="font-bold">Table Product</div>
          <button
            type="button"
            className="text-xs bg-yellow-400 py-2 px-3 rounded"
            onClick={() => param.callback()}
          >
            Sync
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {param.loading && (
                <tr>
                  <td colSpan={5}>loading...</td>
                </tr>
              )}
              {!param.loading && param.data.length > 0 && param.data.map((a: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.product_name}</td>
                    <td>{a.product_price}</td>
                    <td>{a.product_image}</td>
                    <td>
                      <label
                        htmlFor="view_product"
                        className="text-xs py-2 px-3 rounded-l bg-blue-600 text-white cursor-pointer"
                      >
                        View
                      </label>
                      <Link
                        href={`/dashboard/admin/product/${a._id}`}
                        className="text-xs py-2 px-3 bg-green-600 text-white"
                      >
                        Update
                      </Link>
                      <label
                        htmlFor={`delete_product`}
                        className="text-xs py-2 px-3 rounded-r bg-red-600 text-white cursor-pointer"
                        onClick={() => setDeleted(a._id, a.product_name)}
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                )
              })}
              {!param.loading && param.data.length < 1 && (
                <tr>
                  <td colSpan={5} className="text-center">Data not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <input type="checkbox" id={`delete_product`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="py-4">are you sure you want to delete <b>{productName}</b>?</p>
          <div className="flex items-center justify-end">
            <button className="bg-red-600 text-white py-2 px-3 rounded" onClick={deleteData}>Delete</button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`delete_product`}>Close</label>
      </div>
    </>
  );
}
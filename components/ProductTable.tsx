import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toastError } from "@/plugins/toasification";

interface CProps {
  data: any[];
  loading: boolean;
  callback(): void;
}

export default function ProductTable(param: CProps) {
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [loadDelete, setLoadDelete] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const setSelected = (id: string, name: string, price: string, image: string) => {
    setProductId(id);
    setProductName(name);
    setProductPrice(price);
    setProductImage(image);
  }

  const deleteData = async () => {
    setLoadDelete(true);

    try {
      const request = await axios.delete("/admin/product", {
        data: {id: productId}
      });
      if (request.status == 200) {
        param.callback();
        setModal(false);
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoadDelete(false);
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
                  <td colSpan={5} className="text-center">loading...</td>
                </tr>
              )}
              {!param.loading && param.data.length < 1 && (
                <tr>
                  <td colSpan={5} className="text-center">Data not found</td>
                </tr>
              )}
              {!param.loading && param.data.length > 0 && param.data.map((a: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.product_name}</td>
                    <td>Rp. {Intl.NumberFormat("id-ID").format(parseInt(a.product_price))}</td>
                    <td>{a.product_image}</td>
                    <td>
                      <label
                        htmlFor="view_product"
                        className="text-xs py-2 px-3 rounded-l bg-blue-600 text-white cursor-pointer"
                        onClick={() => setSelected(a._id, a.product_name, a.product_price, a.product_image)}
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
                        htmlFor="delete_product"
                        className="text-xs py-2 px-3 rounded-r bg-red-600 text-white cursor-pointer"
                        onClick={() => setSelected(a._id, a.product_name, a.product_price, a.product_image)}
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <input
        type="checkbox"
        id="delete_product"
        className="modal-toggle"
        checked={modal}
        onChange={(v: any) => setModal(v.target.checked)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="py-4">are you sure you want to delete <b>{productName}</b>?</p>
          <div className="flex items-center justify-end">
            <button
              className="bg-red-600 text-white py-2 px-3 rounded"
              onClick={deleteData}
              disabled={loadDelete}
            >
                {loadDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="delete_product">Close</label>
      </div>
      <input 
        type="checkbox"
        id="view_product"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{productName}</h3>
          <div className="flex justify-center items-center my-3">
            {productImage && <Image src={`/images/${productImage}`} width={200} height={200} alt="" />}
          </div>
          <div className="font-bold text-sm">
            Price:
            <br />
            <span className="text-lg text-blue-600">Rp. {Intl.NumberFormat("id-ID").format(parseInt(productPrice))}</span>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="view_product">Close</label>
      </div>
    </>
  );
}
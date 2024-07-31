"use client";

import { toastError, toastSuccess } from "@/plugins/toasification";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserManagement() {
  const [data, setData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);

  const getData = async () => {
    setLoadData(true);

    try {
      const request = await axios.get("/api/admin/user");
      if (request.status == 200) {
        console.log(request.data.message);
        setData(request.data.message);
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoadData(false);
  }

  const changeStatus = async (checked: boolean, index: number, id: string) => {
    // const tmpData = data;
    // tmpData[index].active = checked ? 1 : 0;
    // setData(tmpData);
    try {
      const request = await axios.put("/api/admin/user", {
        data: {id: id, status: checked ? "1" : "0"}
      });
      if (request.status) {
        toastSuccess(request.data.message);
        getData();
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="border">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loadData && (
              <tr>
                <td colSpan={6} className="text-center">Loading...</td>
              </tr>
            )}
            {!loadData && (
              <>
                {data.length > 0 && data.map((ab: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {ab.name}
                      </td>
                      <td>
                        {ab.username}
                      </td>
                      <td>
                        {ab.role == "2" ? "Manager" : "Viewer"}
                      </td>
                      <td>
                        <span
                          className={`text-xs px-2 py-1 text-white rounded ${ab.active == "1" ? "bg-blue-600" : "bg-yellow-600"}`}
                        >
                          {ab.active == "1" ? "Active" : "Deactive"}
                        </span>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="toggle toggle-info"
                          onChange={(v) => changeStatus(v.target.checked, index, ab._id)}
                          checked={ab.active == "1" ? true : false}
                        />
                      </td>
                    </tr>
                  );
                })}
                {data.length < 1 && (
                  <tr>
                    <td colSpan={6} className="text-center">Data not found</td>
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
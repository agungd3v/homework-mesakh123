"use client";

import { toastError, toastSuccess } from "@/plugins/toasification";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";

export default function UserManagement() {
  const [data, setData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [modalView, setModalView] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<any>(null);
  const [loadSelected, setLoadSelected] = useState<boolean>(true);
  const [loadUpdate, setLoadUpdate] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const getData = async () => {
    setLoadData(true);

    try {
      const request = await axios.get(`/api/admin/user?search=${searchText}`);
      if (request.status == 200) {
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

  const changeSelectUser = async (id: string, prefix: string) => {
    setSelectUser(null);
    setLoadSelected(true);

    try {
      const request = await axios.get(`/api/admin/user/${id}`);
      if (request.status == 200) {
        setSelectUser(request.data.message);
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoadSelected(false);
  }

  const updateUser = async () => {
    setLoadUpdate(true);

    try {
      const request = await axios.put(`/api/admin/user/${selectUser._id}`, {
        data: selectUser
      });
      if (request.status == 200) {
        toastSuccess(request.data.message);
        setModalUpdate(false);
        getData();
      }
    } catch (error: any) {
      toastError(error.response.data.message);
    }

    setLoadUpdate(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="border">
      <div className="border-b p-3 flex flex-col md:flex-row items-center justify-between">
        <div></div>
        <div className="w-full md:w-auto flex">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search username..."
            className="border text-sm outline-none rounded-l h-[36px] px-3 w-full md:w-[240px]"
            onChange={(v: any) => setSearchText(v.target.value)}
          />
          <button
            type="button"
            className="h-[36px] px-3 rounded-r bg-blue-600"
            onClick={getData}
          >
            <BiSearch size={20} color="#fff" />
          </button>
        </div>
      </div>
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
                        <div className="flex items-center">
                          <label
                            htmlFor="view_user"
                            className="text-xs text-white rounded-l bg-blue-600 h-[26px] px-3 flex items-center cursor-pointer"
                            onClick={() => changeSelectUser(ab._id, "view")}
                          >
                            View
                          </label>
                          <label
                            htmlFor="update_user"
                            className="text-xs text-white rounded-r bg-green-600 h-[26px] px-3 flex items-center cursor-pointer"
                            onClick={() => changeSelectUser(ab._id, "update")}
                          >
                            Update
                          </label>
                          <div className="w-[20px]"></div>
                          <input
                            type="checkbox"
                            className="toggle toggle-info"
                            onChange={(v) => changeStatus(v.target.checked, index, ab._id)}
                            checked={ab.active == "1" ? true : false}
                          />
                        </div>
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
      <input 
        type="checkbox"
        id="view_user"
        className="modal-toggle"
        checked={modalView}
        onChange={(v: any) => setModalView(v.target.checked)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {loadSelected && <div className="text-center">Loading...</div>}
          {!loadSelected && <div className="flex flex-col gap-2.5">
            <div className="font-bold text-sm">
              Name:
              <br />
              <span className="text-lg text-blue-600">{selectUser.name}</span>
            </div>
            <div className="font-bold text-sm">
              Username:
              <br />
              <span className="text-lg text-blue-600">{selectUser.username}</span>
            </div>
            <div className="font-bold text-sm">
              Role:
              <br />
              <span className="text-lg text-blue-600">
                {selectUser.role == 1 && "Admin"}
                {selectUser.role == 2 && "Manager"}
                {selectUser.role == 3 && "Viewer"}
              </span>
            </div>
            <div className="font-bold text-sm">
              Status:
              <br />
              <span className="text-lg text-blue-600">
                {selectUser.active == 0 && "Deactive"}
                {selectUser.active == 1 && "Active"}
              </span>
            </div>
          </div>}
        </div>
        <label className="modal-backdrop" htmlFor="view_user">Close</label>
      </div>
      <input 
        type="checkbox"
        id="update_user"
        className="modal-toggle"
        checked={modalUpdate}
        onChange={(v: any) => setModalUpdate(v.target.checked)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {loadSelected && <div className="text-center">Loading...</div>}
          {!loadSelected && <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="off"
                className="w-full border px-3 py-2 outline-none rounded"
                placeholder="Type name"
                defaultValue={selectUser.name}
                onChange={(v: any) => {
                  setSelectUser((prevState: any) => ({...prevState, name: v.target.value}));
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="off"
                className="w-full border px-3 py-2 outline-none rounded"
                placeholder="Type username"
                defaultValue={selectUser.username}
                onChange={(v: any) => {
                  setSelectUser((prevState: any) => ({...prevState, username: v.target.value}));
                }}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="off"
                className="w-full border px-3 py-2 outline-none rounded"
                placeholder="Type password"
                defaultValue={selectUser.password}
                onChange={(v: any) => {
                  setSelectUser((prevState: any) => ({...prevState, password: v.target.value}));
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="text-sm">Role</label>
              <select
                id="role"
                className="w-full border px-3 py-2 outline-none rounded"
                defaultValue={selectUser.role}
                onChange={(v: any) => {
                  setSelectUser((prevState: any) => ({...prevState, role: v.target.value}));
                }}
              >
                <option value="0">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Viewer</option>
              </select>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="py-2 px-3 bg-green-600 text-white text-sm rounded"
                onClick={updateUser}
                disabled={loadUpdate}
              >
                {loadUpdate ? "Update..." : "Update"}
              </button>
            </div>
          </div>}
        </div>
        <label className="modal-backdrop" htmlFor="update_user">Close</label>
      </div>
    </div>
  );
}
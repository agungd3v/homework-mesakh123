"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function HomeSection() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const jumpSearch = (key: any) => {
    if (key.which == 13) {
      setDisabled(true);
      router.push(`/search?q=${search}`);
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <div className="text-white text-3xl">
        Hai,
        <span className="text-4xl font-bold pl-1">mau belanja apa?</span>
      </div>
      <div className="bg-white py-5 px-4 mt-3 rounded-full w-full md:w-1/2 flex gap-3 items-center">
        <BiSearch size={26} />
        <div className="flex-1">
          <input
            type="text"
            autoComplete="off"
            className="outline-none w-full"
            placeholder="Search product..."
            onChange={(v: any) => setSearch(v.target.value)}
            onKeyDown={jumpSearch}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
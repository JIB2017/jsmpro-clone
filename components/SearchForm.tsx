"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { formUrlQuery } from "@/sanity/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const delay = setTimeout(() => {
      let newUrl = "";

      if (search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <form
      className="flex-center w-full mx-auto mt-10 sm:-mt-10 sm:px-5"
      action=""
    >
      <label className="flex-center w-full relative max-w-3xl">
        <Image
          src="/magnifying-glass.svg"
          alt="search-icon"
          width={32}
          height={32}
          className="absolute left-8"
        />
        <Input
          className="base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring-0 !ring-offset-0 placeholder:text-white-800"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>
  );
};

export default SearchForm;

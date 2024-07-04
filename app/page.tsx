"use client";

import Link from "next/link";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end

  return `/products?page=${pageIndex}&limit=10`; // SWR key
};

const fetcher = () => {
  return [{ title: "Next.JS" }, { title: "React.JS" }, { title: "Node.JS" }];
};

export default function HomePage() {
  const { cache } = useSWRConfig();
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  console.log("Cache data:", cache);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="mb-5 space-y-2">
        <button
          className="px-4 py-2 bg-cyan-500 text-white rounded-full"
          onClick={() => setSize(size + 1)}
        >
          Load More {size}
        </button>
        <Link href="/about" className="block underline">
          Open About Page ↗️
        </Link>
      </div>

      <div className="border rounded-md p-2">
        <h3 className="text-xl font-bold">Products: </h3>

        <ul>
          {data?.map((products) => {
            return products.map(({ title }, index) => (
              <li key={index}>{title}</li>
            ));
          })}
        </ul>
      </div>
    </>
  );
}

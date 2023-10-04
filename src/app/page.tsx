"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import AppTable from "@/components/app.table";
export default function Home() {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:8000/blogs",
  //   fetcher,{
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   }
  // );
  const { data, error, isLoading } = useSWRImmutable(
    "http://localhost:8000/blogs",
    fetcher
  );
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <div>data: {data?.length}</div>
      <div>hello world</div>
      <Link href={"/youtube"}>Youtube</Link>
      {/* <AppTable blogs={data} /> */}
      <AppTable blogs={data?.sort((a:any, b:any)=>b.id-a.id)} />
    </div>
  );
}

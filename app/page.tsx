import Image from "next/image";
import Issuespage from "./issues/page";
import Pagination from "./issues/_components/Pagination";

export default function Home() {
  return (
    <>
    Hi, I am the Dashboard
    {/* <Issuespage/> */}
    <Pagination currentPage={1} itemsCount={10} pageSize={10}/>
    </>
  );
}

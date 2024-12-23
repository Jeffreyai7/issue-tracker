import Image from "next/image";
import Issuespage from "./issues/page";
import Pagination from "./issues/_components/Pagination";

export default function Home({searchParams}: {searchParams :{page: string} }) {
  const pageNumber = parseInt(searchParams.page) 

  return (
    <>
    Hi, I am the Dashboard
    {/* <Issuespage/> */}
    <Pagination currentPage={pageNumber} itemsCount={100} pageSize={10}/>
    </>
  );
}

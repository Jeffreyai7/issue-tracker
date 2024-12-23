import Pagination from "./issues/_components/Pagination";

export default function Home({searchParams}: {searchParams :{page: string, status: string} }) {
  const pageNumber = parseInt(searchParams.page) || 1;
  console.log("searchParams", pageNumber)
  return (
    <>
    Hi, I am the Dashboard
    {/* <Issuespage/> */}
    <Pagination currentPage={pageNumber} itemsCount={100} pageSize={10}/>
    </>
  );
}

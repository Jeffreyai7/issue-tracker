"use client"
import dynamic from "next/dynamic";
import Formskeleton from "../_components/Formskeleton";


const IssueForm = dynamic(
  ( ) => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <Formskeleton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}


export default NewIssuePage;



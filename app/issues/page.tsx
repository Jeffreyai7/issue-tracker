import React from 'react'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import Pagination from './_components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'


interface Props {
  searchParams: IssueQuery; // Ensure type matches query param type

}

const Issuespage = async ({ searchParams }: Props) => {

  
  
  const statuses =  Object.values(Status) // Default fallback
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  
  const orderBy = columnNames
  .includes(searchParams.orderBy) 
   ? {[searchParams.orderBy] : "asc"}
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const where = { status }
  const issues = await prisma.issue.findMany({
  where,
  orderBy,
  skip: (page - 1) * pageSize,
  take: pageSize
  });

  const issueCount = await prisma.issue.count({where})

  return (
    <Flex direction={'column'} gap={"3"}>
    <IssueActions />
    <IssueTable searchParams={searchParams} issues={issues} />
    <Pagination pageSize={pageSize} currentPage={page} itemsCount={issueCount}/>
    </Flex>
  )
}

export default Issuespage;



// import React from 'react'

// const page = ({searchParams}:{searchParams:{status : string} }) => {
// //  console.log("hi :", searchParams.status)

// const val = searchParams.status

//   return (
//     <div>page {val}</div>
//   )
// }

// export default page
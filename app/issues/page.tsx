import React from 'react'
import {Table } from "@radix-ui/themes"
// import Link from '../components/Link'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import { Issue, Status } from '@prisma/client'
import NextLink from "next/link"
import Link from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import IssueActions from './IssueActions'


interface Props {
  searchParams: { status: Status, orderBy: keyof Issue}; // Ensure type matches query param type

}

const Issuespage = async ({searchParams}: Props) => {

  const columns : {label:string, value: keyof Issue, className?: string }[] = [
  {label: "Issue" , value: "title"},
  {label: "Status" , value: "status", className:'hidden md:table-cell'},
  {label: "Created" , value: "createdAt", className:'hidden md:table-cell'}
  ]


  const statuses =  Object.values(Status) // Default fallback
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const orderBy = searchParams.orderBy ? {[searchParams.orderBy] : "asc"} : undefined;
  // console.log("Hello :",  status)
  // Fetch issues based on status (optional: filter issues based on `status`)
  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy
  },
);

  return (
    <div>
    <IssueActions/>
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {
            columns.map(column => {
              return (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={`/issues/?orderBy=${column.value}`}
                >
                {column.label}
                </NextLink>
                {column.label === searchParams.orderBy && <ArrowUpIcon/>}
                </Table.ColumnHeaderCell>

              )
            })
          }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                {issue.title}
                </Link>
                <div className='block md:hidden'>
                <IssueStatusBadge  status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
              <IssueStatusBadge  status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Root>
    
    </div>
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
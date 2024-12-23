"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses : {label: string, value?: Status}[] = [
{label: "ALL",},
{label: "Open", value: 'OPEN'},
{label: "In Progress", value: 'IN_PROGRESS'},
{label: "Closed", value: 'CLOSED'},

]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
       <Select.Root defaultValue={searchParams.get("status") || ""} onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status) params.append('status', status);
        if(searchParams.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!)
          const query = params.size ? "?"+params.toString() : ""
          // const query = status ? `?status=${status}` : ""; 
        router.push(`/issues/${query}`)
      }}>
          <Select.Trigger placeholder='Filter Issues by...' />
          <Select.Content>
              {
                statuses.map((status, index) => <Select.Item key={index} value={status.value!}>{status.label} </Select.Item>)
              }
          </Select.Content>
      
      </Select.Root> 

    </div>
  )
}

export default IssueStatusFilter;

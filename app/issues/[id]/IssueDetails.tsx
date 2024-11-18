import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { $Enums } from '@prisma/client';
import { Heading, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
title : string,
status: $Enums.Status;
createdAt: Date;
description: string,

}

const IssueDetails = ({title, status,createdAt,description}: Props) => {
  return (
    <div>
        <Heading>{title}</Heading>
        <div className='flex space-x-3 my-2'>
        <IssueStatusBadge status={status}/>
        <Text>{createdAt.toDateString()}</Text>
        </div>
        <Card className='prose' mt="4">
        <ReactMarkdown>{description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetails
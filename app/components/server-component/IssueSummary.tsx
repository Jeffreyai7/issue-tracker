import { Status } from '@prisma/client';
import { Card, Flex, Link, Text } from '@radix-ui/themes'
import React from 'react'


interface Props {
    open: number;
    inProgress: number;
    closed: number;
}
const IssueSummary = ({closed, inProgress, open}: Props) => {
  const containers : {label:string, value:number, status: Status}[] = [
    {label: "Open Issues", value: open, status:"OPEN"},
    {label: "Closed Issues", value: closed, status: "CLOSED"},
    {label: "In-progress Issues", value: inProgress, status:"IN_PROGRESS"}
]
    return (
    <div>
        <Flex gap={"4"}>
            {
                containers.map(container => (
                    <Card key={container.label}>
                        <Flex direction={"column"} gap={"1"}>
                            <Link className='text-sm font-medium' href={`/issues/?status=${container.status}`}>{container.label}</Link>
                            <Text size={"5"} className='font-medium'>{container.value}</Text>
                        </Flex>
                    </Card>
                ))
            }
        </Flex>
    </div>
  )
}

export default IssueSummary
"use client"

import { Card } from '@radix-ui/themes';
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts";



interface Props {
    open:number;
    inProgress:number;
    closed: number;
}

const IssueCharts = ({open, inProgress, closed}: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ]
    return (
    <Card>
        <ResponsiveContainer />
            <BarChart data= {data}>
            <XAxis dataKey= "label"/>
            <YAxis/>
            <Bar dataKey="value" barSize={60} style={{fill="var(--accent-9)"}} />
        </BarChart>

    </Card>
  )
}

export default IssueCharts
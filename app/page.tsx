import prisma from "@/prisma/client";
import Pagination from "./issues/_components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default  async function Home() {
 const open = await prisma.issue.count({
  where: {
    status: "OPEN"
  }
 })
 const closed = await prisma.issue.count({
  where: {
    status: "CLOSED"
  }
 })
 const inProgress = await prisma.issue.count({
  where: {
    status: "IN_PROGRESS"
  }
 })
  
 return (
    <Grid columns= {{initial: "1", md:"2"}} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
        <IssueCharts open={open} inProgress={inProgress} closed={closed}/>
      </Flex>
      <LatestIssues/>
    </Grid>
  );
}


export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues"
}
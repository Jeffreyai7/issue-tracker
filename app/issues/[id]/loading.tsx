import IssueStatusBadge from "@/app/components/server-component/IssueStatusBadge";
import { Box, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <>
      <Box className="max-w-xl">
        <Skeleton />
        <div className="flex space-x-3 my-2">
          <Skeleton width={"5rem"} />
          <Skeleton width={"8rem"} />
        </div>
        <Card className="prose" mt="4">
          <Skeleton count={3} />
        </Card>
      </Box>
    </>
  );
};

export default LoadingIssueDetailPage;

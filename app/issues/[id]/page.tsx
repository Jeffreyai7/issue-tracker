import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import delay from "delay";
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { auth } from '@/app/auth';
import AssigneeSelect from './AssigneeSelect';

interface Props {
  params:  {id: string} 
}

const IssueDetailPage = async ({params}: Props) => {
  
  const issue = await prisma.issue.findUnique({
    where: {id: parseInt((params.id))}
  })
  
  if (!issue)
    notFound();
  const session = await auth()
  
  await delay(2000) 
  return (
    <Grid columns={{initial: "1", sm:"5"} } gap={"5"}>
      <Box className='md:col-span-4'>
      <IssueDetails title={issue.title} status={issue.status} createdAt={issue.createdAt} description={issue.description}/>
      </Box>
      {
        session &&       <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue}/>
        <EditIssueButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id}/>
        </Flex>
      </Box>

      }
    </Grid>
  )
}

export default IssueDetailPage
"use client"
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({issueId}: {issueId:number}) => {

  const router = useRouter()
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button color='red'>
          {/* <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link> */}
          Delete Issue
        </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone
        </AlertDialog.Description>
        <Flex justify={'between'} mt={"4"}>
          <AlertDialog.Cancel>
            <Button color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button 
            onClick={async() =>{
              await axios.delete(`/api/issues/${issueId}`)
              router.push("/issues")
            }}
            color='red'>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

export default DeleteIssueButton
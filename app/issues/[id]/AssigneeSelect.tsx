"use client"
import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
const AssigneeSelect = ({issue}: {issue: Issue}) => {
    // const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>("/api/users");
    //         setUsers(data)
    //     }
    //     fetchUsers()
    // })

    const {data:users, isLoading, error} = useUsers();

    if(isLoading) return <Skeleton/>;
    if(error) return null;

    const assignIssue = (userId: string) => {
            axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null }).catch(() => {
                toast.error('Changes could not be saved');
            });
    }
  return (
    <div>
        <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={ assignIssue}>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                     <Select.Label>Suggestions</Select.Label>
                    {/* <Select.Item value='unassigned'>Unassigned</Select.Item> */}
                    {
                    users?.map(user => <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item> )
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </div>
  )
}

const useUsers = () => {
return  useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 1000 * 100, //60s
        retry: 3
    })
}

export default AssigneeSelect
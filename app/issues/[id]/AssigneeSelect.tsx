"use client"
import { User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = () => {
    // const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>("/api/users");
    //         setUsers(data)
    //     }
    //     fetchUsers()
    // })

    const {data:users, isLoading, error} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60000, //60s
        retry: 3
    })

    if(isLoading) return <Skeleton/>;
    if(error) return null;

  return (
    <div>
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {
                    users?.map(user => <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item> )
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>
  )
}

export default AssigneeSelect
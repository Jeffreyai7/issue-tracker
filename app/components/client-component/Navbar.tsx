"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {

  return (
    <nav className=' border-b mb-5 px-5 h-14 py-3'>
        <Container>
        <Flex justify={"between"}>
            <Flex align={"center"} gap={"3"}>
                <Link href={"/"}><AiFillBug/></Link>
                <Navlinks/>
            </Flex>
            <AuthStatus/>
        </Flex>
        </Container>
    </nav> 
  )
}

const Navlinks = () => {

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}
    ];

    const pathname = usePathname()

     return (
        <ul className='flex space-x-5'>
                    {
                        links.map(link => 
                        <li key={link.label}><Link className={classNames({
                            "nav-link": true,
                            '!text-zinc-900' : link.href === pathname,
                        })}  href={link.href}>{link.label}</Link></li> )
                    }
                </ul>
     )
}


const AuthStatus = () => {
    
    const {status, data: session} = useSession();

    if (status === "loading") return null;

    if(status === "unauthenticated")
        return <Link className='nav-link' href={"/api/auth/signin"}>Log in</Link>

    return (
        <Box>
            {
                status === "authenticated" && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar 
                            src={session.user?.image!} 
                            fallback="?" size={"2"} 
                            radius='full' 
                            className='cursor-pointer'
                            referrerPolicy ='no-referrer'
                            
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size={"2"}>
                            {session.user?.email}
                            </Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href="/api/auth/signout">Log out</Link>
                        </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )
            }
            </Box>
    )
}

export default Navbar
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const Navbar = () => {

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}
    ];

    const {status, data: session} = useSession();

   const pathname = usePathname()

  return (
    <nav className=' border-b mb-5 px-5 h-14 py-3'>
        <Container>
        <Flex justify={"between"}>
            <Flex align={"center"} gap={"3"}>
                <Link href={"/"}><AiFillBug/></Link>
                <ul className='flex space-x-5'>
                    {
                        links.map(link => 
                        <li key={link.label}><Link className={classNames({
                            'text-zinc-900' : link.href === pathname,
                            'text-zinc-500' : link.href !== pathname,
                            'hover:text-zinc-800 transition-colors' : true
                        })}  href={link.href}>{link.label}</Link></li> )
                    }
                </ul>
            </Flex>
            <Box>
            {
                status === "authenticated" && <Link href={"/api/auth/signout"}>Log out</Link>
            }
            {
                status === "unauthenticated" && <Link href={"/api/auth/signin"}>Log in</Link>
            }
            </Box>
        </Flex>
        </Container>
    </nav> 
  )
}

export default Navbar
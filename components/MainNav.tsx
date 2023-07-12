"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export  function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){
    const pathname=usePathname()
    const params=useParams()
    const routes=[
        {
            href:`/${params.storeId}`,
            label:'Dashboard',
            isActive:pathname.includes('/')

        },
        {
            href:`/${params.storeId}/settings`,
            label:'Settings',
            isActive:pathname.includes('settings')

        }
    ]
    return(
        <nav   className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {routes.map((route)=>(
                <Link href={route.href} key={route.href} className={cn(
                    "text-sm font-medium transition-colors text-gray-900 hover:text-primary focus:outline-none focus:text-gray-700  duration-150 ease-in-out"
                    ,route.isActive ? 'text-black dark:text-white' : 'text-muted-foreground '
                )}>
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
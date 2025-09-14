'use client'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { useNotify } from '@/contexts/notification-context'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const a = ['courses/new','dashboard','profile']
    const {notify} = useNotify()
    
  return (
    <div>
        <Navigation/>
        Be an Instructor
        <div className="flex flex-col gap-5">
            {a.map((b,i)=>(
                <Link href={`/instructor/${b}`} key={i}>
                    <Button>
                        {b}
                    </Button>
                </Link>
            ))}
        </div>
        <Button onClick={()=>notify('some notify msg')}>Click </Button>
    </div>
  )
}


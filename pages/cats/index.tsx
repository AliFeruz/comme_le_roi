import RootLayout from '@/components/RootLayout'
import Link from 'next/link'
import React from 'react'
import { PlusCircleIcon}  from '@heroicons/react/24/outline'

type Props = {}

const Cats = (props: Props) => {
  return (
    <RootLayout>
      <div className='mt-3'>
        <Link href={'/cats/newcat'} className='flex bg-lavanda-300 w-2/5 rounded-lg py-2 px-2.5'>
          <PlusCircleIcon className='w-8 h-8'/>
          <h1 className='text-2xl font-semibold'>Add new CAT</h1>
        </Link>
      </div>
    </RootLayout>
    
  )
}

export default Cats
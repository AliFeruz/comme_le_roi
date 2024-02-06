import RootLayout from '@/components/RootLayout'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

type Props = {}

const News = (props: Props) => {
  return (
    <RootLayout>
      <div className='mt-3'>
        <Link href={'/news/newNews'} className='flex bg-lavanda-200 w-1/2 rounded-lg py-2 px-2.5'>
          <PlusCircleIcon className='w-8 h-8 text-lavanda-500'/>
          <h1 className='text-2xl ml-3 font-semibold'>Add some New's</h1>
        </Link>
      </div>
    <div>News</div>
    </RootLayout>
   
  )
}

export default News
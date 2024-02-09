import RootLayout from '@/components/RootLayout'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PlusCircleIcon}  from '@heroicons/react/24/outline'
import axios from 'axios'
import { Cat } from '@/types'
import CatCard from '@/components/CatCard'


const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([])

  useEffect(()=> {
    axios.get('/api/cats').then(res => {
      setCats(res.data)
    })
  },[])

  return (
    <RootLayout>
      <div className='mt-3'>
        <Link href={'/cats/newcat'} className='flex bg-lavanda-200 md:w-1/2 
        justify-center items-center rounded-lg py-2 px-2.5'>
          <PlusCircleIcon className='w-8 h-8 text-cyan-500'/>
          <h1 className='md:text-2xl ml-3 font-bold'>Добавить новую кошку</h1>
        </Link>
      </div>
      <div className='p-2 my-4 text-start'>
      <h1 className='text-2xl font-bold'>Все кошки</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3'>
        {cats.slice().reverse().map((cat) => (
          <CatCard key={cat._id} cat={cat} />
        ))}
      </div>
    </RootLayout>
    
  )
}

export default Cats
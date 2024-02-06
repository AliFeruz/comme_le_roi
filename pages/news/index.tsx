import NewsCard from '@/components/NewsCard'
import RootLayout from '@/components/RootLayout'
import { News } from '@/types'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const News = () => {
  const [news, setNews] = useState<News[]>([])

  useEffect(()=> {
    axios.get('/api/news').then(res => {
      setNews(res.data)
    })
  },[])

  return (
    <RootLayout>
      <div className='mt-3'>
        <Link href={'/news/newNews'} className='flex bg-lavanda-200 w-1/2 rounded-lg py-2 px-2.5'>
          <PlusCircleIcon className='w-8 h-8 text-lavanda-500'/>
          <h1 className='text-2xl ml-3 font-semibold'>Add some New's</h1>
        </Link>
      </div>
      <div className='p-2 my-4 text-start'>
      <h1 className='text-2xl font-bold'>Cats</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {news.slice().reverse().map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </RootLayout>
   
  )
}

export default News
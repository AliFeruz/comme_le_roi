import RootLayout from '@/components/RootLayout'
import NewsForm from '@/components/forms/NewsForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const EditNews = () => {
  const [newsInfo, setNewsInfo] = useState(null)
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if(!id) {
      return;
    }
    axios.get('/api/news?id=' +id).then((res) => {
      setNewsInfo(res.data)
    }
    )
  },[id])

  return (
    <RootLayout>
      
      <div className='m-4'>
      <h1 className='text-3xl text-start text-lavanda-700'>Edit cat info</h1>
      </div>
      <div className='flex justify-center w-full'>
      {newsInfo && <NewsForm newsInfo={newsInfo}/>}
      </div>
         
    </RootLayout>
    
  )
}

export default EditNews
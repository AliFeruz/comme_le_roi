import { News } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

type Props = {
  newsInfo: News
}

const NewsForm = ({newsInfo}: Props) => {
    const [title, setTitle] = useState(newsInfo?.title || '');
    const [info, setInfo] = useState(newsInfo?.info || '');
  

  const router = useRouter();

  async function saveNews(e: React.FormEvent) {
   try {
    e.preventDefault();
    const data = {title, info}
    if(newsInfo?._id) {
      const res = await axios.put('/api/news', {...data, _id: newsInfo._id})
      if(res.status === 200){
        setTitle('');
        setInfo('');
        router.push('/news')
      }
    } else {
      const response = await axios.post('/api/news', data);
      if(response.status === 200){
        setTitle('');
        setInfo('');
        router.push('/news')
      }
    }
   
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className='w-full flex justify-center'>
    <form onSubmit={saveNews} className='flex flex-col w-5/6 mt-5'>
      <label className='text-start'>News title</label>
      <input type="text" placeholder='title' value={title}
      onChange={(e) => setTitle(e.target.value)}/>
      <label>Info</label>
      <textarea placeholder='description of news' value={info}
      onChange={(e) => setInfo(e.target.value)}/>
      <div className='flex justify-between'>
      <Link href={'/news'} className='btn-primary'>Cancel</Link>
      <button type='submit'className='btn-primary'>Save</button>
      </div>
      </form>
    </div>
  )
}

export default NewsForm
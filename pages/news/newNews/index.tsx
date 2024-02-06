import RootLayout from '@/components/RootLayout'
import NewsForm from '@/components/forms/NewsForm'
import React from 'react'


const NewNews = () => {
  return (
    <RootLayout>
      
      <div className='m-4'>
      <h1 className='text-3xl text-start text-lavanda-700'>Add some News</h1>
      </div>
      <div className='flex justify-center w-full'>
      <NewsForm/>
      </div>
         
    </RootLayout>
  )
}

export default NewNews
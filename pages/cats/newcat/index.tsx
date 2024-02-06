import RootLayout from '@/components/RootLayout'
import CatForm from '@/components/forms/CatForm';
import React from 'react'


const NewCat = () => {

  return (
    <RootLayout>
      
      <div className='m-4'>
      <h1 className='text-3xl text-start text-lavanda-700'>Add new cat</h1>
      </div>
      <div className='flex justify-center w-full'>
      <CatForm/>
      </div>
         
    </RootLayout>
   
  )
}

export default NewCat
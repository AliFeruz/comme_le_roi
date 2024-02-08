import RootLayout from '@/components/RootLayout'
import CatForm from '@/components/forms/CatForm';
import React from 'react'


const NewCat = () => {

  return (
    <RootLayout>
      
      <div className='m-4 w-full'>
      <h1 className='md:text-3xl md:text-start text-lavanda-700'>Создайте данные новой кошки</h1>
      </div>
      <div className='flex justify-center w-full'>
      <CatForm/>
      </div>
         
    </RootLayout>
   
  )
}

export default NewCat
import RootLayout from '@/components/RootLayout'
import CatForm from '@/components/forms/CatForm'
import { PencilIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const EditCat = () => {
  const [catInfo, setCatInfo] = useState(null)
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if(!id) {
      return;
    }
    axios.get('/api/cats?id=' +id).then((res) => {
      setCatInfo(res.data)
    }
    )
  },[id])

  return (
    <RootLayout>
      
      <div className='m-4'>
      <h1 className='text-3xl text-start text-lavanda-700'>Редактируй данные животного</h1>
      </div>
      <div className='flex justify-center w-full'>
      {catInfo && <CatForm catInfo={catInfo}/>}
      </div>
         
    </RootLayout>
    
  )
}

export default EditCat
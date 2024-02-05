import RootLayout from '@/components/RootLayout'
import { PencilIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {}

const EditCat = (props: Props) => {
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if(!id) {
      ReceiptRefundIcon
    }
    axios.get('/api/cats?id=' +id).then((res) => {
      console.log(res.data)
    }
    )
  },[id])

  return (
    <RootLayout>
      <div className='flex bg-lavanda-200 w-1/2 mt-3 rounded-lg py-2 px-2.5'>
      <PencilIcon className='w-8 h-8 text-lavanda-500'/>
      <h1 className='text-2xl ml-3 font-semibold'>Edit cat data</h1>
      </div>
    <div className='mt-3'>EditCat</div>
    </RootLayout>
    
  )
}

export default EditCat
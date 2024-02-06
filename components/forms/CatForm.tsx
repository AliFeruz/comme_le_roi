import { Cat } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

type Props = {
  catInfo?: Cat;
}

const CatForm = ({catInfo}: Props) => {
  const [name, setName] = useState(catInfo?.name || '');
  const [description, setDescription] = useState(catInfo?.description || '');
  const [dataBirth, setDataBirth] = useState (catInfo?.dataBirth || '');

  const router = useRouter();

  async function saveCats(e: React.FormEvent) {
   try {
    e.preventDefault();
    const data = {name, description, dataBirth}
    if(catInfo?._id) {
      const res = await axios.put('/api/cats', {...data, _id: catInfo._id})
      if(res.status === 200){
        setName('');
        setDescription('');
        setDataBirth('');
        router.push('/cats')
      }
    } else {
      const response = await axios.post('/api/cats', data);
      if(response.status === 200){
        setName('');
        setDescription('');
        setDataBirth('');
        router.push('/cats')
      }
    }
   
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className='w-full flex justify-center'>
    <form onSubmit={saveCats} className='flex flex-col w-5/6 mt-5'>
      <label className='text-start'>Cat name</label>
      <input type="text" placeholder='cat name' value={name}
      onChange={(e) => setName(e.target.value)}/>
      <label>Cat description</label>
      <textarea placeholder='description' value={description}
      onChange={(e) => setDescription(e.target.value)}/>
      <label>Day of birth (d.m.y)</label>
      <input type='text' placeholder='day of birth' value={dataBirth}
      onChange={(e) => setDataBirth(e.target.value)}/>
      <div className='flex justify-between'>
      <Link href={'/cats'} className='btn-primary'>Cancel</Link>
      <button type='submit'className='btn-primary'>Save</button>
      </div>
      </form>
    </div>
  )
}

export default CatForm
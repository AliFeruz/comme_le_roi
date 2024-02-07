import { Cat } from '@/types';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Loader from '../Loader';

type Props = {
  catInfo?: Cat;
}

const CatForm = ({catInfo}: Props) => {
  const [name, setName] = useState(catInfo?.name || '');
  const [description, setDescription] = useState(catInfo?.description || '');
  const [dataBirth, setDataBirth] = useState (catInfo?.dataBirth || '');
  const [images, setImages] = useState(catInfo?.images || []);
  const [isuploading, setIsUploading] = useState(false);

  const router = useRouter();

  async function saveCats(e: React.FormEvent) {
   try {
    e.preventDefault();
    const data = {name, description, dataBirth, images}
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

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>){
    const files = Array.from(e.target?.files || []);
    if (files.length > 0) {
      const data = new FormData();
      files.forEach(file => data.append('file', file));
      const res = await axios.post('/api/upload', data);
      setImages((prevImages) => {
        return [...prevImages, ...res.data.images]
      });
      setIsUploading(false)
    }
  }

  return (
    <div className='w-full flex justify-center'>
    <form onSubmit={saveCats} className='flex flex-col w-5/6 mt-5'>
      <label className='text-start'>Cat name</label>
      <input type="text" placeholder='cat name' value={name}
      onChange={(e) => setName(e.target.value)}/>
      <label className='text-start'>Photos</label>
      <div className='p-1 flex gap-4'>
      {!!images?.length && images?.map((image, index) => (
        <div key={index}>
          <img src={image.link} alt="product image" className='w-24 h-24 object-cover rounded-md'/>
        </div>
      ))}
      {isuploading && (
        <div className='p-1 items-center flex'>
         <Loader/>
        </div>
      )}
      <label className='w-24 h-24 cursor-pointer flex gap-2 flex-col 
      items-center justify-center bg-white border mb-3 border-lavanda-500 rounded-md'>
      <ArrowDownCircleIcon className="w-8 h-8 text-lavanda-500"/>
      <p className='text-sm text-slate-600'>Upload</p>
      <input type="file" onChange={uploadImages} className='hidden'/>
      </label>
        {!catInfo?.images?.length && (
          <div className='w-full my-4 p-3 text-2xl rounded-md bg-lavanda-200'>
            <h1>This cat doesn't have any photos</h1>
          </div>
        )}
      </div>
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
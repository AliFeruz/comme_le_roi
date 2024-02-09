import { Cat, Category } from '@/types';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import { ReactSortable } from 'react-sortablejs';

type Props = {
  catInfo?: Cat;
}

interface ItemInterface {
  id: string;
  link: string;
}

const CatForm = ({catInfo}: Props) => {
  const [name, setName] = useState(catInfo?.name || '');
  const [description, setDescription] = useState(catInfo?.description || '');
  const [dataBirth, setDataBirth] = useState (catInfo?.dataBirth || '');
  const [images, setImages] = useState<ItemInterface[]>(catInfo?.images || []);
  const [isuploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState(catInfo?.category || '')

  const router = useRouter();

  useEffect(()=> {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data)
    })
  },[])

  async function saveCats(e: React.FormEvent) {
   try {
    e.preventDefault();
    const data = {name, description, dataBirth, images, category}
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
      setIsUploading(true)
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
      <label className='text-start'>Имя Кошки или Кота</label>
      <input type="text" placeholder='cat name' value={name}
      onChange={(e) => setName(e.target.value)}/>
      <label>Категория</label>
      <select value={category.toString()}
      onChange={(e) => setCategory(e.target.value)}
      className='w-1/3 mb-2 items-start border border-cyan-400 
      p-1.5 rounded-md'>
        <option value="">Без категирии</option>
        {categories.length > 0 && categories.map((category: Category) => (
        <option key={category._id}
        value={category._id}>{category.name}</option>
      ))}
      </select>
      <label className='text-start'>Фотографии</label>
      <div className='p-1 flex flex-wrap gap-2'>
        <ReactSortable list={images} setList={setImages} className='flex gap-2 flex-wrap'>
        {!!images?.length && images?.map((image, index) => (
        <div key={image?.id || index}>
          <img src={image.link} alt="cat image" className='w-24 h-24 object-cover rounded-md'/>
        </div>
      ))}
        </ReactSortable> 
      {isuploading && (
        <div className='h-24 flex items-center justify-center p-2'>
         <Loader/>
        </div>
      )}
      <label className='w-24 h-24 cursor-pointer flex gap-2 flex-col 
      items-center justify-center bg-white border mb-3 border-cyan-500 rounded-md'>
      <ArrowDownCircleIcon className="w-8 h-8 text-cyan-500"/>
      <p className='text-sm text-cyan-500'>Upload</p>
      <input type="file" onChange={uploadImages} className='hidden'/>
      </label>
        {!catInfo?.images?.length && (
          <div className='w-full my-4 p-3 text-2xl rounded-md bg-lavanda-200'>
            <h1>This cat doesn't have any photos</h1>
          </div>
        )}
      </div>
      <label>Описание животного</label>
      <textarea placeholder='description' value={description}
      onChange={(e) => setDescription(e.target.value)}/>
      <label>Дата рождения в формате (день/месяц/год)</label>
      <input type='text' placeholder='day of birth' value={dataBirth}
      onChange={(e) => setDataBirth(e.target.value)}/>
      <div className='flex gap-2 justify-between mt-2'>
      <Link href={'/cats'} className='btn-primary'>Отмена</Link>
      <button type='submit'className='btn-primary'>Сохранить</button>
      </div>
      </form>
    </div>
  )
}

export default CatForm
import RootLayout from '@/components/RootLayout'
import axios from 'axios';
import React, { useState } from 'react'

type Props = {}

const NewCat = (props: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dataBirth, setDataBirth] = useState ('');

  async function saveCats(e: React.FormEvent) {
    e.preventDefault();
    const data = {name, description, dataBirth}
    await axios.post('/api/cats', data)
  }

  return (
    <RootLayout>
      
      <div className='mx-5'>
      <h1 className='text-3xl text-start text-lavanda-700'>Add new cat</h1>
      </div>
      <div className='flex justify-center w-full'>
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
      <button type='submit'className='btn-primary'>Save</button>
      </form>
      </div>
         
    </RootLayout>
   
  )
}

export default NewCat
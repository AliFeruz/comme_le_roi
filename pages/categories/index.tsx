import RootLayout from '@/components/RootLayout'
import { Category } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

interface RequestData {
  name: string;
  parentCategory?: string;
}

const Categories = ({ swal, ...props }: { swal: any }) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
   fetchCategories();
  },[])

  function deleteCategory(category: Category){
    swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            const {_id} = category;
            await axios.delete('/api/categories?_id=' + _id);
            fetchCategories();
        }
    })}

  function fetchCategories(){
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }

  async function editCategory(category: Category){
    setEditingCategory(category);
    setName(category.name);
    setParentCategory(category?.parentCategory?._id?.toString() || '');
  }


  async function saveCategory(e: React.FormEvent){
    e.preventDefault();
    const data: RequestData = {name};

    if (parentCategory !== '') {
      data.parentCategory = parentCategory;
    }

    if(editingCategory) {
      const _id = editingCategory._id
      await axios.put('/api/categories', {...data, _id});
      setEditingCategory(null)
      
    } else {
     await axios.post('/api/categories', data);
    }  
      setName('');
      setParentCategory('');
      fetchCategories();
  }

  return (
    <RootLayout>
    <div className='mt-2 bg-lavanda-200 w-1/2 mb-2 rounded-lg py-2 px-2.5'>
      <h1 className='text-3xl font-bold text-center'>Категории</h1>
    </div>
    <label>{editingCategory ? `Редактируемая категория ${editingCategory.name}`: 'Создай категорию'}</label>
    <form onSubmit={saveCategory} className='flex items-center gap-4'>
    <input type="text" placeholder='Category name' 
    className='mb-0' onChange={(e) => setName(e.target.value)}
    value={name}/>
    <select className='w-30 border border-lavanda-400 p-1.5 rounded-md'
    value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
      <option value="">No parent category</option>
      {categories.length > 0 && categories.map((category: Category) => (
        <option key={category._id}
        value={category._id}>{category.name}</option>
      ))}
    </select>
    <button className='btn-primary' type='submit'>Save</button>
    </form>
    <table className='mt-4 bg-lavanda-100 w-full shadow-md rounded-md'>
      <thead>
      <tr className='border-b-2 border-slate-400'>
        <td className='p-2 text-xl font-bold mx-2'>Category name</td>
        <td className='p-2 text-xl font-bold mx-2'>Parent category</td>
      </tr>
      </thead>
      <tbody>
        {categories.length > 0 && categories.map((category: Category) => (
            <tr key={category._id}>
            <td className='p-2 text-xl border-b-2 border-slate-300'>{category.name}</td>
            <td className='p-2 text-xl border-b-2 border-slate-300'>{category.parentCategory?.name}</td>
            <td>
              <button className='btn-primary mx-2 my-2' 
              onClick={() => editCategory(category)}>Edit</button>
            </td>
            <td>
              <button className='btn-primary'
              onClick={() => deleteCategory(category)}>Delete</button>
            </td>
          </tr>
          ))}
      </tbody>
      
    </table>
    </RootLayout>
  )
}

export default withSwal(Categories)
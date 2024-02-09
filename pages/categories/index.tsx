import RootLayout from '@/components/RootLayout'
import { Category, Property } from '@/types';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

interface RequestData {
  name: string;
  parentCategory?: string;
  properties?: Property[];
}

const Categories = ({ swal, ...props }: { swal: any }) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState<Property[]>([])

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
    setProperties(category?.properties || [])
  }

  function cancelUpdate(){
    setEditingCategory(null);
    setName('');
    setParentCategory('');
    setProperties([]);
  }


  async function saveCategory(e: React.FormEvent){
    e.preventDefault();
    const data: RequestData = {
      name,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values,
      })),
    };

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
      setProperties([]);
      fetchCategories();
  }

  function addProperty() {
    setProperties((prevProperties) => [
      ...prevProperties,
      { name: '', values: [] },
    ]);
  }

function handlePropertyName(index: number, property: Property, newName: string) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index] = { ...updatedProperties[index], name: newName };
      return updatedProperties;
    });
  }

  function handlePropertyValues(index: number, property:Property, newValues: string) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index] = { ...updatedProperties[index], values: newValues.split(',') };
      return updatedProperties;
    });
  }

function removeProperty(index: number) {
    setProperties((prev) => prev.filter((_, i) => i !== index));
}

  return (
    <RootLayout>
      <div className='w-full flex flex-col'>
      <div className='mt-2 bg-lavanda-200 w-full md:w-1/2 mb-2 rounded-lg py-2 px-2.5'>
      <h1 className='text-3xl font-bold text-center'>Категории</h1>
    </div>
    <div className='mb-3 mt-2'>
    {editingCategory ? (
      <div className='flex justify-between'>
      <label>Редактируемая категория <span className='font-bold text-xl text-cyan-500'>{editingCategory.name}</span></label>
      <button onClick={cancelUpdate} className='btn-primary'>Отменить</button>
      </div>
    ) : (
      <label>Создай новую категорию</label>
    )}
    </div>
    <form onSubmit={saveCategory} className='flex items-center gap-1 md:gap-4'>
    <input type="text" placeholder='Category name' 
    className='mb-0' onChange={(e) => setName(e.target.value)}
    value={name}/>
    <select className='w-30 border border-cyan-500 p-1.5 rounded-md'
    value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
      <option value="">No parent category</option>
      {categories.length > 0 && categories.map((category: Category) => (
        <option key={category._id}
        value={category._id}>{category.name}</option>
      ))}
    </select>
    <button className='btn-primary' type='submit'>Сохранить</button>
    </form>
    <div className='mt-4'>
      <button className='flex bg-lavanda-200 md:w-1/2 
        justify-between items-center rounded-lg py-1.5 px-6' onClick={addProperty}>
      <PlusCircleIcon className='w-8 h-8 text-cyan-500'/>
      <h1 className='md:text-2xl md:font-bold'>Добавить характеристику</h1>
      </button>
    </div>
    <div className='mt-4'>
      {properties.length > 0 && properties.map((property: Property, index) => (
        <div className='flex px-4 mb-3 gap-4' key={index}>
        <input type="text" className='mb-0'
        onChange={(e) => handlePropertyName(index, property, e.target.value)}
        value={property.name} placeholder='property name (example: color)' />
        <input type="text" className='mb-0'
        onChange={(e) => handlePropertyValues(index, property, e.target.value)}
        value={property.values.join(',')} placeholder='values, comma separated' />
        <button onClick={() => removeProperty(index)} type='button'
        className="btn-primary">Remove</button>
        </div>
            ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-4">
        {categories.map((category: Category) => (
          <div key={category._id} className="bg-lavanda-50 border-2 border-cyan-500 p-4 h-40 rounded-md shadow-md">
            <div className='flex gap-3 items-center p-2 mb-3 justify-between'>
            <button onClick={() => deleteCategory(category)}>
            <TrashIcon className="w-5 h-5 text-cyan-500"/>
            </button>
            <button onClick={() => editCategory(category)}>
              <PencilIcon className="w-5 h-5 text-cyan-500"/>
            </button>
          </div>
            <div className="flex flex-col p-3">
            <h1 className='text-xl text-start font-bold mb-2'>{category.name}</h1>
            <h1 className='text-xl mb-2'>{category.parentCategory?.name}</h1>
            </div>
          </div>
        ))}
      </div>
      </div>
    </RootLayout>
  )
}

export default withSwal(Categories)
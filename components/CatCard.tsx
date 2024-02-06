import React from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Cat } from '@/types';
import { withSwal } from 'react-sweetalert2';
import axios from 'axios';

type Props = {
  cat: Cat;
  swal: any;
  };


const CatCard = ({ cat, swal, ...props }: Props) => {


    function deleteCat(cat: Cat){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${cat.name}`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#e8aef9',
            reverseButtons: true
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const {_id} = cat;
                await axios.delete('/api/cats?_id=' + _id);
            }
        })
    }

    return (
        <div className='bg-lavanda-200 drop-shadow-lg rounded-md p-4'>
          <div className='flex gap-3 items-center p-2 mb-3 justify-between'>
            <button onClick={() => deleteCat(cat)}>
            <TrashIcon className="w-5 h-5 text-lavanda-500"/>
            </button>
            <Link href={`/cats/edit/${cat._id}`}>
              <PencilIcon className="w-5 h-5 text-lavanda-500"/>
            </Link>
          </div>
          <div className='p-1 border-t border-lavanda-500'>
            <h1 className='text-xl mb-2'>{cat.name}</h1>
          </div>
          <div className="p-1 h-auto rounded-md">
          <p className="text text-lg">{cat.description}</p>
          </div>
          {/* <div className='p-1'>
            <img src={cat?.images[0]} alt="product img" className='h-24 w-24 rounded-md'/>
          </div> */}
          <div className='p-1 mb-2'>
          <p className='text-gray-600'>{cat.dataBirth}</p>
          </div>
        
        </div>
      )
};

export default withSwal(CatCard);

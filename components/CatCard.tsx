import React from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Cat } from '@/types';
import { withSwal } from 'react-sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  cat: Cat;
  swal: any;
  };


const CatCard = ({ cat, swal, ...props }: Props) => {
    const router = useRouter();

    function deleteCat(cat: Cat){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${cat.name}`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const {_id} = cat;
                await axios.delete('/api/cats?_id=' + _id);
                router.reload();
            }
        })
    }

    const backgroundImageStyle = {
      backgroundImage: `url(${cat.images && cat.images.length > 0 ? cat.images[0].link : ''})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return (
      <div className='relative group'>
        <div className='bg-lavanda-200 drop-shadow-lg h-[250px] rounded-md p-4' style={backgroundImageStyle}>
          <div className='flex gap-3 items-center p-2 mb-3 justify-between'>
            <button onClick={() => deleteCat(cat)} className='z-10'>
            <TrashIcon className="w-6 h-6 text-lavanda-50"/>
            </button>
            <Link href={`/cats/edit/${cat._id}`} className='z-10'>
              <PencilIcon className="w-6 h-6 text-lavanda-50"/>
            </Link>
          </div>
          {!cat.images || cat.images.length === 0 && (
            <>
            <div className='p-2 mt-4 z-10'>
              <h1 className='text-xl text-center text-lavanda-500 mb-2'>{cat.name}</h1>
            </div>
            <div className="p-1 h-auto rounded-md">
            <p className="text-lg text-center text-lavanda-500 mb-2">{cat.description}</p>
          </div>
            </>    
          )}
          <div className={'hover-visible rounded-md px-3'}>
            <div className='p-1 mt-48'>
              <h1 className='text-xl text-lavanda-50 mb-2'>{cat.name}</h1>
            </div>
          </div>
        </div>
      </div>
        
      )
};

export default withSwal(CatCard);

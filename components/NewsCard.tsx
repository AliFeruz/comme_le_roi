import React from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { News } from '@/types';
import { withSwal } from 'react-sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  news: News;
  swal: any;
  };


const NewsCard = ({ news, swal, ...props }: Props) => {
  const router = useRouter();


    function deleteNews(news: News){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${news.title}`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#e8aef9',
            reverseButtons: true
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const {_id} = news;
                await axios.delete('/api/news?_id=' + _id);
                router.reload();
            }
        })
    }

    return (
        <div className='bg-lavanda-200 drop-shadow-lg rounded-md p-4'>
          <div className='flex gap-3 items-center p-2 mb-2 justify-between'>
            <button onClick={() => deleteNews(news)}>
            <TrashIcon className="w-5 h-5 text-lavanda-500"/>
            </button>
            <Link href={`/news/edit/${news._id}`}>
              <PencilIcon className="w-5 h-5 text-lavanda-500"/>
            </Link>
          </div>
          <div className='p-1 border-t border-lavanda-500'>
            <h1 className='text-xl mt-1 mb-2'>{news.title}</h1>
          </div>
          <div className="p-1 h-auto rounded-md">
          <p className="text text-lg">{news.info}</p>
          </div>
          {/* <div className='p-1'>
            <img src={cat?.images[0]} alt="product img" className='h-24 w-24 rounded-md'/>
          </div> */}
          
        
        </div>
      )
};

export default withSwal(NewsCard);

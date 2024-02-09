import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react';

const LeftSideBar = () => {
    const {data:session} = useSession();
    const inactivlink = 'flex gap-4 bg-lavanda-200 drop-shadow-xl rounded-lg border-2 border-cyan-500 justify-center items-center p-2 text-2xl';
    const activlink = inactivlink + ' bg-slate-50 text-lavanda-950 rounded-lg';
    const router = useRouter();
    const pathname = router.pathname;

    async function logOut(){
      await router.push('/');
      await signOut()
    }


  return (
    <nav className='p-2 m-4'>  
        <div className='p-4 flex flex-col items-center justify-center'>
        <Link href={'/'}><h1 className="text-4xl underline underline-offset-8 
        mb-1 font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent uppercase p-1">Comme Le Roi</h1></Link>
        <div className='flex w-4/5 bg-blue-100 border border-cyan-500 
        my-2 drop-shadow-xl mx-1 gap-2 p-1 rounded-lg items-center'>
             <img src={session?.user?.image ?? 'no image'} alt="userimage" 
             className="w-8 rounded-full h-8"/>
             <span className="px-2">{session?.user?.name}</span>
           </div>
        </div>
        <div className='flex flex-col min-h-[70vh] justify-between'>
            <div className='flex flex-col gap-6'>
            <Link href={'/'} className={pathname === '/' ? activlink : inactivlink}>
            <h1>Панель приборов</h1>
            </Link>
            <Link href={'/cats'} className={pathname.includes('/cats') ? activlink : inactivlink}>
            <h1>Кошки</h1>
            </Link>
            <Link href={'/categories'} 
            className={pathname.includes('/categories') ? activlink : inactivlink}>
              <h1>Категории</h1>
            </Link>
            <Link href={'/news'} 
            className={pathname.includes('/news') ? activlink : inactivlink}>
            <h1>Новости</h1>
            </Link>
            <Link href={'/settings'} 
            className={pathname.includes('/settings') ? activlink : inactivlink}>
              <h1>Настройки</h1>    
            </Link>
            </div>
            <div className='px-2 flex justify-center'>
            <button onClick={logOut} className={`${inactivlink} $ w-2/4`}>
              <h1>Выйти</h1>    
            </button>
            </div>
        </div>
    </nav>
  )
}

export default LeftSideBar
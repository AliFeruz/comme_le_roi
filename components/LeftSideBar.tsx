import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react';

const LeftSideBar = () => {
  const inactivlink = 'flex gap-4 bg-emerald-200 rounded-lg border-2 border-emerald-500 justify-center items-center p-2 text-2xl';
    const activlink = inactivlink + ' bg-emerald-400 text-gray-950 rounded-lg';
    const router = useRouter();
    const pathname = router.pathname;

    async function logOut(){
      await router.push('/');
      await signOut()
    }


  return (
    <nav className='p-2 m-4'>  
        <nav className='flex flex-col min-h-[70vh] justify-between'>
            <div className='flex flex-col gap-6'>
            <Link href={'/'} className={pathname === '/' ? activlink : inactivlink}>
            <h1>Dashboard</h1>
            </Link>
            <Link href={'/cats'} className={pathname.includes('/cats') ? activlink : inactivlink}>
            <h1> Cats</h1>
            </Link>
            <Link href={'/categories'} className={pathname.includes('/categories') ? activlink : inactivlink}>
              <h1>Categories</h1>
            </Link>
            <Link href={'/news'} className={pathname.includes('/news') ? activlink : inactivlink}>
            <h1>News</h1>
            </Link>
            <Link href={'/settings'} className={pathname.includes('/settings') ? activlink : inactivlink}>
              <h1>Settings</h1>    
            </Link>
            </div>
            <div className='px-2'>
            <button onClick={logOut} className={inactivlink}>
              <h1>Signout</h1>    
            </button>
            </div>
        </nav>
    </nav>
  )
}

export default LeftSideBar
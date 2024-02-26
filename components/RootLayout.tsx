import React, { ReactNode } from 'react'
import Loader from './Loader';
import { useSession } from 'next-auth/react';
import Topbar from './TopBar';
import LeftSideBar from './LeftSideBar';
import useMediaQuery from '@/hooks/useMediaQuery';
import LoginForm from './forms/LoginForm';


const RootLayout = ({ children }: { children: ReactNode }) => {
  const {data:session, status} = useSession();
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">
           <Loader/>
           </div>;
  }

  if(!session) {
    return (
      <main className='min-h-screen w-screen flex items-center 
      justify-center bg-gradient-to-r from-lavanda-200 to-lavanda-400'>
      <LoginForm/>
    </main>
    )
  }


  return (
    <main className='flex min-h-screen bg-lavanda-50'>
      <Topbar/>
      {isAboveMediumScreens && (
        <div className='w-2/6 sx:hidden mt-4'>
        <LeftSideBar/>
        </div>
      )}
      
      <div className="bg-white border border-cyan-500 drop-shadow-xl 
      mt-24 md:mt-4 h-auto w-full p-4 md:w-4/6 m-2 md:mr-3 rounded-lg">
      {children}
      </div> 
    </main>
  )
}

export default RootLayout
import React, { ReactNode } from 'react'
import Loader from './Loader';
import { signIn, useSession } from 'next-auth/react';
import Topbar from './TopBar';
import LeftSideBar from './LeftSideBar';
import useMediaQuery from '@/hooks/useMediaQuery';



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
      <main
      className='h-screen w-screen flex items-center 
      justify-center bg-gradient-to-r from-lavanda-200 to-lavanda-400'
    >
      <div className='w-[450px] h-[300px] flex flex-col items-center justify-center rounded-md'>
        <h1 className='p-2 my-4 text-2xl'>This website is belong to cattery Comme Le Roi 
        and only owner of the website can login. If you have any questions, please write an email to: aliferuzcode@gmail.com</h1>
      <button onClick={() => signIn('google')} className="bg-lavanda-400 
      border-4 border-lavanda-600 h-[60px] w-[120px] text-slate-50 object-fit rounded-md 
      hover:bg-lavanda-100 hover:text-slate-600">Login with Google</button>
      </div>
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
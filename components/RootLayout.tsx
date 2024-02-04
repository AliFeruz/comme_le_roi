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

  if (!session || status !== "authenticated") {
    return (
      <main className='bg-sky-900 h-screen w-screen flex items-center'>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-sky-400 p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </main>
    );
  }


  return (
    <main className='flex bg-emerald-100'>
      <Topbar/>
      {isAboveMediumScreens && (
        <div className='w-2/5 sx:hidden mt-24'>
        <LeftSideBar/>
        </div>
      )}
      
      <div className="bg-emerald-50 mt-24 min-h-screen w-full p-4 md:w-3/5 m-2 md:mr-3 rounded-lg">
      {children}
      </div> 
    </main>
  )
}

export default RootLayout
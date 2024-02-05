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
      className={'h-screen w-screen flex items-center justify-center bg-gradient-to-r from-lavanda-200 to-lavanda-400'}
    >
      <div>
      <button onClick={() => signIn('google')} className="bg-lavanda-400 border-4 border-lavanda-600 text-lavanda-900 py-2 px-4 rounded-lg hover:bg-lavanda-100">Login with Google</button>
      </div>
    </main>
    )
  }


  return (
    <main className='flex min-h-screen bg-lavanda-100'>
      {/* <Topbar/> */}
      {isAboveMediumScreens && (
        <div className='w-2/6 sx:hidden mt-4'>
        <LeftSideBar/>
        </div>
      )}
      
      <div className="bg-lavanda-50 border border-lavanda-500 drop-shadow-xl mt-4 h-auto w-full p-4 md:w-4/6 m-2 md:mr-3 rounded-lg">
      {children}
      </div> 
    </main>
  )
}

export default RootLayout
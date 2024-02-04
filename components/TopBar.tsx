import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";



const Topbar = () => {
    const {data:session} = useSession();
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const router = useRouter();

    async function logOut(){
      await router.push('/');
      await signOut()
    }
  
    return (
      <section>
        <div className="flex-between h-20
      fixed top-0 z-30 w-full drop-shadow bg-gradient-to-l from-emerald-50 to-emerald-400 py-2">
        <div className="flex-between mx-auto w-5/6">
        <Link href={'/'}><h1 className="text-3xl font-bold text-gray-600 p-1">Comme Le Roi</h1></Link>
          {isAboveMediumScreens ? (
             <div className='flex bg-emerald-300 border border-emerald-50 drop-shadow-xl mx-1 gap-2 p-1 rounded-lg items-center'>
             <img src={session?.user?.image ?? 'no image'} alt="userimage" className="w-8 rounded-full h-8"/>
             <span className="px-2">{session?.user?.name}</span>
           </div>
          ) : (
            <button className="rounded-full bg-emerald-300 p-1 border-2 border-emerald-50"
             onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <Bars3Icon className="h-8 w-8 text-emerald-50"/>
            </button>
          )}
        </div>
        </div>
        
          
          {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 
            h-full w-[300px] bg-emerald-200">
            <div className="flex justify-end p-12">
           <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
           <XMarkIcon className="h-8 w-8 text-emerald-950"/>
           </button>
            </div>
            <div className="ml-[10%] flex flex-col justify-center items-center gap-10 text-2xl">
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/cats'}>
            <h1>Cats</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/categories'}>
            <h1>Categories</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/news'}>
            <h1>News</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/settings'}>
            <h1>Settings</h1>
           </Link>
           </button>
            </div>
            <div className="mt-24 flex justify-center">
            <button onClick={logOut} className="flex items-center gap-3">
            <h1 className="text-xl">Signout</h1>    
            <ArrowLeftStartOnRectangleIcon className="h-8 w-8 text-emerald-950"/>
            </button>
            </div>
            </div>
          )}
       
      </section>
    )
  }
  
  export default Topbar;


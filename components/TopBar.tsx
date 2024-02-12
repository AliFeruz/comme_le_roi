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
        <div className="flex-between h-20 md:hidden
      fixed top-0 z-30 w-full drop-shadow bg-gradient-to-l from-lavanda-50 to-lavanda-400 py-2">
        <div className="flex-between mx-auto w-5/6">
        <Link href={'/'}><h1 className="text-3xl font-bold text-slate-600 p-1">Comme Le Roi</h1></Link>
          
            <button className="rounded-full bg-lavanda-300 p-1 border-2 border-emerald-50"
             onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <Bars3Icon className="h-8 w-8 text-emerald-50"/>
            </button>
        
        </div>
        </div>
        
          
          {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 
            h-full w-[300px] bg-lavanda-200">
            <div className="flex justify-end p-12">
           <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
           <XMarkIcon className="h-8 w-8 text-emerald-950"/>
           </button>
            </div>
            <div className="ml-[10%] flex flex-col justify-center items-center gap-10 text-2xl">
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/cats'}>
            <h1>Кошки</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/categories'}>
            <h1>Категории</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/news'}>
            <h1>Новости</h1>
           </Link>
           </button>
           <button onClick={() => setIsMenuToggled(false)}>
           <Link href={'/settings'}>
            <h1>Настройки</h1>
           </Link>
           </button>
            </div>
            <div className="mt-24 flex justify-center">
            <button onClick={logOut} className="flex items-center gap-3">
            <h1 className="text-xl">Выйти</h1>    
            <ArrowLeftStartOnRectangleIcon className="h-8 w-8 text-emerald-950"/>
            </button>
            </div>
            </div>
          )}
       
      </section>
    )
  }
  
  export default Topbar;


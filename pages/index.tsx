import RootLayout from "@/components/RootLayout";
import { useSession, signIn } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  if(!session) {
    return (
      <main
      className={'h-screen w-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-900'}
    >
      <div>
      <button onClick={() => signIn('google')} className="bg-emerald-300 border-4 border-emerald-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-emerald-100">Login with Google</button>
      </div>
    </main>
    )
  }

  return (
    <RootLayout>
      <div>Hello world</div>
    </RootLayout>
  );
}

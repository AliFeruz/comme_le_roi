import RootLayout from "@/components/RootLayout";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  

  return (
    <RootLayout>
      <div className="p-6 my-4">
        <h1 className="text-xl text-center">
          Hello, <span className="text-lavanda-600 text-2xl">{session?.user?.name}!</span>
        </h1>
      </div>
     
    </RootLayout>
  );
}

import RootLayout from "@/components/RootLayout";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  

  return (
    <RootLayout>
      <div>Hello world</div>
      <span className="px-2">{session?.user?.name}</span>
    </RootLayout>
  );
}

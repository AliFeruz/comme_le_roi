import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['aliferuzfox@gmail.com', 'miss.tanikoffa@gmail.com']

const adapter = MongoDBAdapter(clientPromise) as any; 

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
      ],
    adapter,
    callbacks: {
      session: ({ session } : any) => {
        if (adminEmails.includes(session?.user?.email)){
          return {
            ...session,
          };
        } else {
          return false
        }
      },
    },
}

export default NextAuth(authOptions);

export async function isAdminRequest({req, res} : any){
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)){
    throw 'You are not an admin!';
  }
}
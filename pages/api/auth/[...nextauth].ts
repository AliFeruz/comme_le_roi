import NextAuth, { RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import clientPromise from "@/lib/mongodb";

type Credentials = {
  email: string;
  password: string;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials: Record<never, string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as Credentials;
        try {
          await mongooseConnect();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }
          const checkedPassword = await bcrypt.compare(password, user.password);

          if (!checkedPassword) {
            return null;
          }
          return user;
        } catch (error) {
          console.log('Error: ', error);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60 // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "test",
  pages: {
    signIn: "/",
  },
}

export default NextAuth(authOptions);


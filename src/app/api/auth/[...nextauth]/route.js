import { User } from "@/models/User"
import NextAuth from "next-auth"
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/libs/mongoConnect";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      id:'credentials',
      credentials: {
        username: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // console.log({credentials})
        const email=credentials?.email
        const password=credentials?.password
  
        mongoose.connect(process.env.MONGO_URL);
        const user=await User.findOne({email})
        let passwordOk=user && bcrypt.compareSync(password, user.password)
        if(passwordOk){
          return user
        }
        
        return null
      }
    })
  ]
  }
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
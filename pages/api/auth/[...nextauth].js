import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import EmailProvider from "next-auth/providers/email";
// import clientPromise from "./lib/mongodb"

import connectDb from "../../../src/lib/mongodbOrm";
import UserModel from '../../../src/models/UserModel';
import {validateCredentials} from '../../../src/utils/auth/signInUser'

connectDb();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
       const {email, password} = credentials;
       const user = await UserModel.findOne({email});
       
       if(!user){
         throw new Error('[AUTH]: Need to register first')
       }

       return validateCredentials({user, password});
      }
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  // using with EmailProvider

  // EmailProvider({
  //   server: {
  //     host: process.env.EMAIL_SERVER_HOST,
  //     port: process.env.EMAIL_SERVER_PORT,
  //     auth: {
  //       user: process.env.EMAIL_SERVER_USER,
  //       pass: process.env.EMAIL_SERVER_PASSWORD
  //     }
  //   },
  //   from: process.env.EMAIL_FROM
  // }),
  // adapter: MongoDBAdapter(clientPromise),

  secret: process.env.SECRET, 

  database: process.env.MONGODB_URI,

  pages: {
    signIn: '/signInWithPassword'
  }
})
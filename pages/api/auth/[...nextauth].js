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

  debug: process.env.NODE_ENV === 'development',

  secret: process.env.SECRET, 

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  database: process.env.MONGODB_URI,

  pages: {
    // signIn: '/signInWithPassword',
    signIn: '/signin'
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})
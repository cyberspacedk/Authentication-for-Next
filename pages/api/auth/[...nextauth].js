import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import clientPromise from "./lib/mongodb"


// const options = {
//   providers: [
//     // GitHubProvider({
//     //   clientId: process.env.GITHUB_CLIENT_ID,
//     //   clientSecret: process.env.GITHUB_CLIENT_SECRET
//     // }),
//     EmailProvider({
//       server: process.env.EMAIL_SERVER,
//       from:process.env.EMAIL_FROM,
//     })
//   ]
// }

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET
})
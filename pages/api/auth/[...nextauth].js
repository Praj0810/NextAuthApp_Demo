import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import  CredentialsProvider  from "next-auth/providers/credentials";
import connectMongo from "../../../database/dbconnect";
import Users from "../../../model/userSchema";
import {compare} from 'bcryptjs';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name:"Credentials",  
            async authorize(credentials, req ){
                connectMongo().catch(error=> {error: "Connection Failed"})
                
                const result = await Users.findOne({email:credentials.email})
                if(!result){
                    throw new Error("No User Found with this Email, Please Signup!!")
                }

                const checkPassword = await compare(credentials.password, result.password)
                
                if(!checkPassword || result.email !== credentials.email){
                    throw new Error("Username or Password doesn't match")
                }

                return result;

            }
        }),
    ],
    secret: "FIm5mdOEs7y5+PCs3xUg3XF3bMF3/EFhLj2SL9L06g0=",
    session: {
        strategy: 'jwt',
    }
})
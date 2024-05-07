import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
providers:[
    CredentialsProvider({
        name:"Email",
        credentials:{
            username:{ label:"email",type: "text",placeholder:"Email"},
            password:{ label:"password",type: "password",placeholder:"Password"},
        },
        async authorize(credentials:any){
            console.log(credentials);
            return{
                id:"user1",
                name:'Manash Bandhu',
                email:"manash9787@gmail.com"
            };
        },
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || ""
      })
    
],
secret: process.env.NEXTAUTH_SECRET,
callbacks: {
    jwt:({token,user})=>{
        token.userId = token.sub;

        return token;
    },
    session:({ session,token,user}:any)=>{
        if(session && session.user){
            session.user.id = token.userId;
        }
        return session;
    }
    }
});

export const GET = handler; 
export const POST = handler;
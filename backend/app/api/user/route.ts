import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export function GET(){
    return Response.json({
        email:"manash@gmail.com",
        name:"Manash"
    })
}

export async function POST(req:NextRequest){

    //extract the body
    const body = await req.json();
    await client.user.create({
        data:{
            username: body.username,
            password: body.password
        }
    })

    //store the body in the database
    console.log(body);

    return Response.json({
        message:"You are logged in!"
})
}


//In express.js

// app.get('/api/user', (req, res) => {
//     res.json({
//         username:"Manash",
//         email:"manash@gmail.com"
//     })
// })
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import client from "@/db";
// const client = new PrismaClient();
//instead of using this use "globalThis"

export function GET() {
  return NextResponse.json({
    email: "manash9787@gmail.com",
    name: "Manash",
  });
}

export async function POST(req: NextRequest) {
  //user can send body , header and query params
  //body
  const body = await req.json();
  try{

      await client.user.create({
        data:{
            email: body.email,
            password: body.password
        }
      });
      return NextResponse.json({
        body
      })

  }catch(e){
   return NextResponse.json({
        message:"Error while signing up"
    },{
        status:411
    })
  }
}
  
// //   console.log(body);
//   //header
//   console.log(req.headers.get("authorization"));
//   //query params
//   console.log(req.nextUrl.searchParams.get("name"));
//   // hit the database with username , password
//   return NextResponse.json({
//     // message: "You are signed in",
//     body
//   });
// }

// // In express

// // app.get("/", (req, res) => {
// //     res.json({
// //         email:"manash9787@gmail.com",
// //         name:"Manash"
// //       })
// //     })

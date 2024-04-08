import { NextApiResponse, NextApiRequest } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { connectedToDataBase } from "../../../../util/db";
import User from "@/app/schema/User";
import { Request } from "express";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/app/schema/User";
import { error, log } from "console";
const saltRounds = 10;


interface UserRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export async function GET(request:any) {
    console.log("GEt request");
    const response =  await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json();
    // const response = await axios.get("http://localhost:8000/api/data")
   return Response.json(data)
}

export async function POST(request:NextRequest) {
    await connectedToDataBase();
        if(request.method === 'POST'){
            try{
                console.log("post request",request.body);
                const userData = await request.json();
                console.log(userData);
                
                const { firstName, lastName, email, password } = userData;
                bcrypt.hash(password,saltRounds,(err,hash)=>{
                    console.log("hash - ",hash)
                    const user = new Users({firstName:firstName,lastName:lastName,email:email,password:hash})
                    user.save();
                    return NextResponse.json(user,{status:201})
                    
                });
                // return hash;
                // console.log("hashedPassword",hashedPassword);
                console.log("data",userData);
            
                // await user.save();
                
            }catch(Error){
                 // If an error occurs, send an error response
                 
                 console.error('registered Failed',Error);
                 
                 Response.json({ error: 'Registered Failed', Error });
            }
        }
        
    // const payload = await request.json();
    // console.log(payload);
    // return NextResponse.json({data:payload},{status:500})
    
}

// const register = async (req, res, next) => {
//     console.log(req);
//     try {
//         console.log(req.body);
//         const { firstName, lastName, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new Users({ firstName, lastName, email, password: hashedPassword });
//         await user.save();
//         res.status(200).send({ message: 'User are registered successfully' });

//     } catch (error) {
//         res.status(500).send({ error: 'Registered Failed', error })
//     }
// }
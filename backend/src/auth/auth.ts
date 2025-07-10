import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

//@ts-ignore
export const Signin = async (req, res) => {
    const { username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email : email
            }
        })

        if(user){
            return res.status(400).json({"message" : "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data : {
                username : username,
                email : email,
                password : hashedPassword
            }
        })

        return res.status(200).json({
            "message" : "User created successfully",
            "user" : {
                "id" : newUser.id,
                "username" : newUser.username,
                "email" : newUser.email
            }
        })
    }
    catch (error){
        console.log('error during signin: ', error);
        return res.status(500).json({"message" : "Internal server error"});
    }
}
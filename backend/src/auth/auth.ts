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

//@ts-ignore
export const Login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({"message" : "All fields are required!"})
    }

    try {
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(400).json({
                "message" : "User does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                "message" : "Invalid password"
            })
        }
        //@ts-ignore
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn : '1h'});
     
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
          
        });
        console.log("logged in")
        console.log(token)
        return res.status(200).json({
            "message" : "Login successful", 
            "token" : token
        })

    } catch (error) {
        console.log("Error while logging in: ", error);
        return res.status(500).json({"message" : "Internal Server Error"})
    }
}

//@ts-ignore
export const Logout = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
    });
    console.log("logged out")
    return res.status(200).json({
      message: "User logged out successfully.",
      success: true
    });
  }
  


//@ts-ignore
export const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token){
            console.log("no token")
            return res.status(401).json({
                message:"User not authenticated.",
                success:false
            })
        }
        //@ts-ignore
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    } catch (error) {
        console.log(error);
    }
}
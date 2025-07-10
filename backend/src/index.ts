import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { getObjectURL, putObject } from './utils/helper';
import { Signin, Login , Logout, isAuthenticated} from './auth/auth';
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // your frontend's URL
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

//@ts-ignore
app.get('/', async (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the Online Uploader API'})
})


app.post('/signin', Signin);
app.post('/login', Login);
app.get('/logout', isAuthenticated, Logout);
//@ts-ignore
app.get('/checker', isAuthenticated, (req, res) => {
    return res.status(200).json({
        message: 'User is authenticated',
        
    })
})


//@ts-ignore
app.put('/upload-url', async (req, res) => {
    const {filename} = req.body;
    if(!filename){
        return res.status(400).json({
            message : 'Filename is required!'
        })
    }

    try {
        const url = await putObject(filename);
        return res.status(200).json({
            message : 'Upload URL generated successfully',
            url: url
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error generating upload URL',
            error: error
        })
        
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
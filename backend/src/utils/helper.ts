import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
})

//@ts-expect-error
export async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: 'ansh-test-bucket-01-alpha',
        Key:key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url;
}

//@ts-expect-error
export async function putObject(filename){
    const command = new PutObjectCommand({
        Bucket: "ansh-test-bucket-01-alpha",
        Key: `/uploads/user-uploads/${filename}`,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}


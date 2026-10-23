import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { envs } from '../config/envs';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
    private readonly s3Bucket = new S3Client({
        region: envs.AWS_REGION,
        credentials: {
            accessKeyId: envs.AWS_ACCESS_KEY_ID,     // <--- Asegúrate de incluirlas aquí
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY, // <--- desde tu objeto envs
        },
    });

    async uploadFile(file: any, folder: string) {
        const key = `${folder}/${randomUUID()}-${extname(file.originalname)}`;
        
        await this.s3Bucket.send(
            new PutObjectCommand({
                Bucket: envs.AWS_BUCKET,
                Key: key,
                ContentType: file.mimetype,
                Body: file.buffer,
            })
        );

        const url = `https://${envs.AWS_BUCKET}.s3.${envs.AWS_REGION}.amazonaws.com/${key}`;
        return url;
    }
}
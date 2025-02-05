/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
//import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
//import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(base64Image: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(base64Image);
      return result.secure_url;
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      throw new Error('No se pudo subir la imagen a Cloudinary');
    }
  }
}

// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'djnabcnkg',
  api_key: '645485884128715',
  api_secret: '05KJwJl97QqjQl8iqWjqK8kVfwY', // Store in .env.local
});

export async function POST(req: NextRequest) {
    try {
      // Log the request body
      const body = await req.json();
      console.log('Upload API received:', body);
  
      const { image, publicId } = body;
  
      if (!image || !publicId) {
        console.error('Missing image or publicId:', { image, publicId });
        return NextResponse.json({ error: 'Missing image or publicId' }, { status: 400 });
      }
  
      // Verify Cloudinary configuration
      if (!"05KJwJl97QqjQl8iqWjqK8kVfwY") {
        console.error('CLOUDINARY_API_SECRET is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
      }
  
      // Log the image URL or type
      console.log('Attempting to upload image:', { image: image.substring(0, 50), publicId });
  
      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'virtual_try_on',
        public_id: publicId,
        resource_type: 'image', // Explicitly set to image
        timeout: 60000, // Set a 60-second timeout
      });
  
      console.log('Cloudinary upload successful:', uploadResult.secure_url);
      return NextResponse.json({ url: uploadResult.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', {
        error
      });
      return NextResponse.json(
        {
          error: 'Failed to upload image',
          details: error.message || 'Unknown error',
        },
        { status: 500 }
      );
    }
  }
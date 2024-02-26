"use client"

import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { imageUploadsProps } from '@/app/types/types';

declare global {
  var cloudinary: any
}


const ImageUploads = ({onChange, value}:imageUploadsProps) => {
  const handleUpload = React.useCallback((result:any) => {
  const singleImage = result.info.secure_url;
    onChange(singleImage)
  },[onChange]);
  
  return (
    <CldUploadWidget
      onUpload={handleUpload} 
      uploadPreset="apartmentImages"
      options={{maxFiles: 1}}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className='border-dashed border-2 relative cursor-pointer hover:opacity-70 transition  p-24 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-md'>
            <TbPhotoPlus size={50}/>
            <div className='font-semibold text-lg'>Click to uplood</div>
            {value && 
              <div className="absolute inset-0 w-full h-full">
                <Image src={value} alt='upload' fill style={{objectFit: 'cover'}} className='rounded-md'/>
              </div>
            }
          </div>
        );
      }}
    </CldUploadWidget>
  )
}

export default ImageUploads;
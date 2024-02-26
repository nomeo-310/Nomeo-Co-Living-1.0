import useLikeListing from '@/app/hooks/useLikeListing';
import { likeButtonProps } from '@/app/types/types';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


const LikeButton = ({listingId, currentUser}:likeButtonProps) => {
  const {alreadyLikeListing, toggleLikeListing} = useLikeListing({listingId, currentUser});

  return (
    <div onClick={toggleLikeListing} className='relative hover:opacity-80 transition cursor-pointer'>
      <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]'/>
      <AiFillHeart size={24} className={`${alreadyLikeListing ? 'fill-rose-500' : 'fill-neutral-500/70'}`}/>
    </div>
  )
}

export default LikeButton;
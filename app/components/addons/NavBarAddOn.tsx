"use client"

import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { menuItemProps } from '@/app/types/types'
import useSignUp from '@/app/hooks/useSignUp'
import useSignIn from '@/app/hooks/useSignIn'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import Container from './Container'
import { categories } from '@/app/constant'
import CategoryBox from './CategoryBox'
import useRent from '@/app/hooks/useRent'

interface userMenuProps {
  currentUser: User
}

const MenuItem = ({onClick, label}:menuItemProps) => {

  return (
    <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
      {label}
    </div>
  )
}

const UserMenu = ({currentUser}:userMenuProps) => {
  const signUpUser = useSignUp();
  const signInUser = useSignIn();
  const rentOut = useRent();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => {setIsOpen((value) => !value)},[]);

  const toggleRent = React.useCallback(() => {
    if (!currentUser) {
      return signInUser.onOpen();
    }

    if (currentUser) {
      return rentOut.onOpen();
    }
  }, [currentUser, signInUser]);

  return (
    <div className='relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={toggleRent} className='user-menu-cta'>
          Rentout Your Home
        </div>
        <div className='user-menu-btn' onClick={toggleOpen}>
          <AiOutlineMenu/>
          <div className="hidden md:block">
            <Avatar imageSrc={currentUser?.image || ''} />
          </div>
        </div>
      </div>
      { isOpen && 
        <div className="user-menu-menu">
          <div className="flex flex-col cursor-pointer">
            { currentUser ? 
              <React.Fragment>
                <MenuItem onClick={() => {}} label='My trips'/>
                <MenuItem onClick={() => {}} label='My favourites'/>
                <MenuItem onClick={() => {}} label='My reservations'/>
                <MenuItem onClick={() => {}} label='My properties'/>
                <MenuItem onClick={rentOut.onOpen} label='Rentout my home'/>
                <hr/> 
                <MenuItem onClick={() => {signOut()}} label='Logout'/>
              </React.Fragment> : 
              <React.Fragment>
                <MenuItem onClick={signInUser.onOpen} label='Login'/>
                <MenuItem onClick={signUpUser.onOpen} label='SignUp'/>
              </React.Fragment>
            }
          </div>
        </div>
      }
    </div>
  )
}

const Logo = () => {
  const router = useRouter();
  return (
    <div className='flex items-center gap-2'>
      <Image
        onClick={() =>router.push('/')}
        alt='app_logo' 
        src='/images/logo.png'
        width={50}
        height={50}
        className='hidden md:block cursor-pointer rounded-full bg-rose-500'
      />
      <h2 className='hidden md:block font-bold text-xl cursor-pointer' onClick={() =>router.push('/')}>Nomeo Coliving</h2>
    </div>
  )
}

const Search = () => {
  return (
    <div className='border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          Anywhere
        </div>
        <div className="text-sm font-semibold px-6 border-x flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm font-semibold pl-6 pr-2 text-center text-gray-500 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guest</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18}/>
          </div>
        </div>
      </div>
    </div>
  )
}

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get('category');

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        { categories.map((item) => (
          <CategoryBox 
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
          ))
        }
      </div>
    </Container>
  )
}

export { Search, Logo, UserMenu, Categories }
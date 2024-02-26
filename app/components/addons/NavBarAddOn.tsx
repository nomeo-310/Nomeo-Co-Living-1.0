"use client"

import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { menuItemProps, userMenuProps } from '@/app/types/types'
import useSignUp from '@/app/hooks/useSignUp'
import useSignIn from '@/app/hooks/useSignIn'
import { signOut } from 'next-auth/react'
import Container from './Container'
import { categories } from '@/app/constant'
import CategoryBox from './CategoryBox'
import useRent from '@/app/hooks/useRent'
import useSearch from '@/app/hooks/useSearch'
import useCountries from '@/app/hooks/useCountries'
import { differenceInDays } from 'date-fns'


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
  const router = useRouter();
  
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
                <MenuItem onClick={() => router.push('/trips')} label='My trips'/>
                <MenuItem onClick={() => router.push('/favourites')} label='My favourites'/>
                <MenuItem onClick={() => router.push('/reservations')} label='My reservations'/>
                <MenuItem onClick={() => router.push('/properties')} label='My properties'/>
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
  const searchListings = useSearch();
  const searchParams = useSearchParams();

  const { getCountryByValue } = useCountries()

  const locvationValue = searchParams.get('locvationValue');
  const startDate = searchParams.get('startDate');
  const endTime = searchParams.get('endTime');
  const guestCount = searchParams.get('guestCount');

  const locationLabel = React.useMemo(() => {
    if (locvationValue) {
      return getCountryByValue(locvationValue as string)?.label
    }

    return 'Anywhere'
  },[getCountryByValue, locvationValue])
  
  const durationLabel = React.useMemo(() => {
    if (startDate && endTime) {
      const start = new Date(startDate as string);
      const end = new Date(endTime as string);

      let diff = differenceInDays(end, start)
      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`
    }

    return 'Any Week'
  },[startDate, endTime]);

  const guestLabel = React.useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return 'Add Guest'
  },[guestCount])

  return (
    <div className='border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer' onClick={searchListings.onOpen}>
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="text-sm font-semibold px-6 border-x flex-1 text-center">{durationLabel}</div>
        <div className="text-sm font-semibold pl-6 pr-2 text-center text-gray-500 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
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
    return null;
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
"use client"

import React from 'react'
import Container from '../addons/Container';
import { Categories, Logo, Search, UserMenu } from '../addons/NavBarAddOn';
import { navBarProps } from '@/app/types/types';


const NavBar = ({currentUser}:navBarProps) => {
  return (
    <div className='w-full fixed bg-white z-10 shadow-sm'>
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo/>
            {/* <Search/> */}
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      {/* <Categories/> */}
    </div>
  )
}

export default NavBar;

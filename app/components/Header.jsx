'use client'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const Header = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/journal' },
    { name: 'History', path: '/graph' },
  ]

  return (
    <div className="flex items-center justify-between py-5 lg:pl-10 lg:pr-12 px-2">
      <div
        className="text-5xl font-bold cursor-pointer hidden lg:block"
        onClick={() => redirect('/journal')}
      >
        InnerSight
      </div>

      <div className="bg-[#d35400] rounded-full md:px-8 px-5 py-3 flex justify-center items-center lg:ml-[-220px] shadow-lg hover:shadow-2xl">
        <ul className="flex gap-10 text-lg text-[#fff2eb]">
          {links.map((link) => (
            <li
              key={link.name}
              className="transition-opacity hover:opacity-80 cursor-pointer"
              onClick={() => redirect(link.path)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="scale-125 flex justify-center items-center cursor-pointer">
        <UserButton />
      </div>
    </div>
  )
}

export default Header

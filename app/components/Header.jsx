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
    <div className="flex items-center justify-between py-7 pl-10 pr-12">
      <div
        className="text-[#d35400] text-5xl font-bold cursor-pointer hidden lg:block md:block"
        onClick={() => redirect('/journal')}
      >
        InnerSight
      </div>

      <div className="bg-[#ff846fca] rounded-full px-8 py-3 flex justify-center items-center md:ml-[-220px] ml-[-32x] shadow-lg hover:shadow-2xl ">
        <ul className="flex gap-10 text-lg">
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

      <div className="scale-125">
        <UserButton />
      </div>
    </div>
  )
}

export default Header

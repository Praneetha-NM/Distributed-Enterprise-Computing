import React from 'react'
import { FaAngleLeft, FaAngleRight, FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='flex items-center gap-2 w-1/2'>
          <FaAngleLeft className='bg-white/10 rounded-full text-4xl p-1' />
          <FaAngleRight className='bg-white/10 rounded-full text-4xl p-1' />
          <div className='w-full text-left py-4 relative ml-3'>
            <input type="text" id='username' name='username' placeholder='Search for a song' className='block w-full rounded-full border-0 text-gray-300 shadow-sm placeholder:text-gray-600 focus:ring-[1px] focus:ring-inset focus:ring-white-600 outline-none p-3 bg-[#1a1919] pl-12' />
            <FaSearch className='absolute top-8 left-3'/>
          </div>
        </div>
  )
}

export default Navbar
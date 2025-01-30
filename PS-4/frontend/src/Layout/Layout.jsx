import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <>
        <div className='flex'>
            <Sidebar/>
            <div className="w-3/4 -z-10 gap-2 absolute right-0">{children}</div>
        </div>
    </>
  )
}

export default Layout
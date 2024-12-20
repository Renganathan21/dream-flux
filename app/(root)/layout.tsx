
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/sidebar'
import React from 'react'

const Layout = (
    {children} : {children: React.ReactNode }
) => {
  return (
    <main className='root'>
      <Sidebar />
      <MobileNav />
        {children}
    </main>
  )
}

export default Layout
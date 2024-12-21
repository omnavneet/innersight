import React from 'react'
import Header from '../components/Header'

const dashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default dashboardLayout
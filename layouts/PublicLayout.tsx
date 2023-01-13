import React from 'react'

import Header from '../components/Layouts/Header'
import Footer from '../components/Layouts/Footer'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default PublicLayout

import React from 'react'

import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

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

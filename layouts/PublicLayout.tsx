import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

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

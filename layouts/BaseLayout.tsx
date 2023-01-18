import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

function BaseLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}

export default BaseLayout

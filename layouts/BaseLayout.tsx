import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default BaseLayout

import React from 'react'
import '../styles/less/main.less'
import type { AppProps } from 'next/app'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType | any
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  // return <Component {...pageProps} />
  return (
    <>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp

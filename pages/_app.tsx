import React from 'react'
import '../styles/scss/main.scss'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType | any
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
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

export default wrapper.withRedux(MyApp)

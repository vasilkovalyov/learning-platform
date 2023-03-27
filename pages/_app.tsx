import React, { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { wrapper } from 'redux/store'
import { Provider } from 'react-redux'
import { setAuthState } from 'redux/slices/auth'

import { parseCookies } from 'nookies'
import UserService from 'services/user.service'
import { RoleType } from 'types/common'

import '../styles/scss/main.scss'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  const { token, userId, role } = parseCookies(ctx)
  if (!token && ctx.asPath?.startsWith('/admin')) {
    ctx.res?.writeHead(302, { Location: '/404' })
    ctx.res?.end()
  }
  if (!token) {
    return {
      pageProps: {},
    }
  }

  try {
    const response = await UserService.isAuthUser(role as RoleType, userId, token)

    if (response.status === 200 && response.data?._id) {
      store.dispatch(setAuthState(response.data))
    }
  } catch (e) {
    console.log(e)
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  }
})

export default App

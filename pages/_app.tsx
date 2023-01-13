import React from 'react'
import '../styles/scss/main.scss'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'
import { Provider } from 'react-redux'
import { setAuthState } from 'redux/slices/auth'

import { parseCookies } from 'nookies'
import UserService from 'services/user.service'
import { RoleType } from 'types/common'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType | any
  }
}

function App({ Component, ...rest }: ComponentWithPageLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (
    <Provider store={store}>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  )
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  const { token, userId, role } = parseCookies(ctx)

  const user = await UserService.isAuthUser(role as RoleType, userId, token || '')
  if (user) {
    store.dispatch(setAuthState(user))
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  }
})

export default App

import React, { ReactElement } from 'react'
import Head from 'next/head'
import PublicLayout from 'layouts/BaseLayout'
import PublicLayoutPage from './publicLayoutPage'

import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return <div>home layout</div>
}

Home.getLayout = PublicLayoutPage

export default Home

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
//   console.log('store', store)

//   return {
//     props: {},
//   }
// })

import React from 'react'
import Head from 'next/head'

import { PrivateLayout } from '../page-layouts'

function Account() {
  return (
    <div>
      <div>
        <h3>Account</h3>
      </div>
    </div>
  )
}

Account.getLayout = PrivateLayout

export default Account

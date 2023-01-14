import React from 'react'
import Head from 'next/head'

import PrivateLayoutPage from 'pages/privateLayoutPage'

function Account() {
  return (
    <div>
      <div>
        <h3>Account</h3>
      </div>
    </div>
  )
}

Account.getLayout = PrivateLayoutPage

export default Account

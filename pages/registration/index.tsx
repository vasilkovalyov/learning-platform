import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import PublicLayout from 'layouts/PublicLayout'

import RegisterCard from 'components/RegisterCard'

const Registration: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="section-registration">
          <div className="container">
            <h2 className="section-registration__heading">Registration</h2>
            <div>
              <div>
                <Link href="/registration/student">
                  <a className="section-registration__card-link">
                    <RegisterCard title="Student" type="student" />
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/registration/teacher">
                  <a className="section-registration__card-link">
                    <RegisterCard title="Teacher" type="teacher" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default Registration

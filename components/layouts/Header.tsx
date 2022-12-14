import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Header as HeaderAnt } from 'antd/lib/layout/layout'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { Divider } from 'antd'
import Icon from 'components/Icon'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectAuthState, clearAuthState } from 'redux/slices/auth'

function Header() {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()
  const router = useRouter()

  function signOut(e) {
    e.preventDefault()

    router.push('/')
    dispatch(clearAuthState())
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:01 GTM;'
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GTM;'
  }

  return (
    <HeaderAnt className="header">
      <div className="container">
        <Row justify="space-between">
          <Col span={10} md={3} className="header__logo-col">
            <Link href="/">
              <a className="header__logo">LearnPlatform</a>
            </Link>
          </Col>
          <Col span={14} className="header__navigation-col"></Col>
          <Col span={14} md={6} className="header__navigation-auth-buttons">
            {authState ? (
              <ul className="header__auth-list">
                <li className="header__auth-item">
                  <Link href="/admin">
                    <a className="header__auth-link">Admin</a>
                  </Link>
                </li>
                <li className="header__auth-item">
                  <Divider type="vertical" />
                </li>
                <li className="header__auth-item">
                  <Link href="/">
                    <a className="header__auth-link" onClick={(e) => signOut(e)}>
                      Sign out
                    </a>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="header__auth-list">
                <li className="header__auth-item">
                  <Icon icon="user" size={20} color="#FA6655" className="header__auth-icon" />
                  <Link href="/auth">
                    <a className="header__auth-link">Sign in</a>
                  </Link>
                </li>
                <li className="header__auth-item">
                  <Divider type="vertical" />
                </li>
                <li className="header__auth-item">
                  <Link href="/registration">
                    <a className="header__auth-link">Sign up</a>
                  </Link>
                </li>
              </ul>
            )}
          </Col>
        </Row>
      </div>
    </HeaderAnt>
  )
}

export default Header

import React from 'react'
import Link from 'next/link'
import { Header as HeaderAnt } from 'antd/lib/layout/layout'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { Divider } from 'antd'
import Icon from 'components/Icon'

function Header() {
  return (
    <HeaderAnt className="header">
      <div className="container">
        <Row justify="space-between">
          <Col span={3}>
            <Link href="/">
              <a className="header__logo">LearnPlatform</a>
            </Link>
          </Col>
          <Col span={14}></Col>
          <Col span={6}>
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
          </Col>
        </Row>
      </div>
    </HeaderAnt>
  )
}

export default Header

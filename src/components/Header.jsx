import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logout } from '../features/logout/logoutSlice'
import ThemeButton from './ThemeButton.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'

const HeaderSection = styled.header`
  font-size: 1.75rem;
  font-weight: 600;
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondary};
`

const LogoImage = styled.img`
  width: auto;
  height: 2.5rem;
  margin-right: 0.5rem;
`

const Logout = styled.button`
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  font-size: 1.25rem;
  cursor: pointer;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  pointer-events: none;
`

function Header() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  return (
    <HeaderSection>
      <Logo to='/'>
        <LogoImage alt='logo' src='/public/DSLogo.png' />
        鼎日能源後台管理系統
      </Logo>
      <Logout type='button' onClick={() => dispatch(logout())}>
        <Icon icon={faRightFromBracket} />
        登出
      </Logout>
      <ThemeButton />
      {pathname !== '/' && <Breadcrumbs />}
    </HeaderSection>
  )
}

export default Header

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { verifyStart, selectVerifyResult } from '../features/verify/verifySlice'
import Header from './Header.jsx'

const Layout = styled.div`
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem 0.5rem;
`

export default function VerifyLayout({ children }) {
  // 使用 useLocation 獲取當前頁面的 url
  const { pathname } = useLocation()
  const props = useParams()
  const dispatch = useDispatch()
  const isAuth = useSelector(selectVerifyResult)
  const token = JSON.parse(window.sessionStorage.getItem('token'))
  useEffect(() => {
    if (token) {
      dispatch(verifyStart({ token, pathname, props }))
    } else {
      window.sessionStorage.clear()
      window.location.replace('/login')
    }
  }, [])

  if (!isAuth) return

  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  )
}

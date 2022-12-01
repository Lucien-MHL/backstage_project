import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { verifyStart, selectVerifyResult } from '../features/verify/verifySlice'
import Header from './Header.jsx'

const Layout = styled.div`
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem 0.5rem;
`
const Main = styled.main`
  display: flex;
  ${({ isClose }) =>
    !isClose
      ? css`
          margin-top: 2rem;
          padding: ${({ padding }) => padding ?? '1rem'};
          max-height: calc(100% - 64px - 2rem);
          min-height: 232px;
          border: 2px solid ${({ theme }) => theme.secondary};
          border-radius: 1.5rem;
          flex-direction: ${({ direction }) => direction ?? 'column'};
        `
      : css`
          width: 100%;
          gap: 1.75rem 4%;
          margin-top: 2rem;
          flex-wrap: wrap;
        `}
`

export default function VerifyLayout({ children, isClose, padding, direction }) {
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
      <Main isClose={isClose} padding={padding} direction={direction}>
        {children}
      </Main>
    </Layout>
  )
}

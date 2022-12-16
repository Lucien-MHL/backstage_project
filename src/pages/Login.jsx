import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsDark } from '../features/switch/switchSlice'
import {
  switchPageButton,
  selectIsLoginPage,
  loginPost,
  selectIsLoading,
  selectMessage,
  selectInfo
} from '../features/login/loginSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginBlock = styled.div`
  width: 400px;
`
const Header = styled.header`
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
`
const LogoImage = styled.img`
  width: auto;
  height: 2.5rem;
  margin-right: 0.5rem;
`
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Account = styled.label`
  width: 75%;
  height: 3.75rem;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.75rem 0;

  ::before {
    content: '\f007';
    font: var(--fa-font-solid);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.75rem;
    height: 3.75rem;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50px;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
  }
`
const Password = styled(Account)`
  ::before {
    content: '\f023';
  }
`
const Email = styled(Account)`
  ::before {
    content: '\f0e0';
  }
`
const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.secondary + '6a'};
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1rem 0.5rem 4.5rem;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.secondary};
  }

  &::-ms-reveal {
    filter: ${(props) => (props.isTheme ? 'invert(100%)' : 'invert(0%)')};
  }
`
const Button = styled.button`
  width: 80%;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 25px;
  padding: 0.75rem;
  margin-top: 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryActive};
  }
`
const ForgetAnchor = styled.button`
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  margin: 1.25rem auto 0;
  text-align: center;
  font-size: medium;
  cursor: pointer;
  display: block;
  border: none;

  &:hover {
    color: ${({ theme }) => theme.secondaryActive};
  }
`
const Warning = styled.p`
  color: ${({ theme }) => theme.warning};

  &::before {
    content: '※';
  }
`
const Info = styled.p`
  color: ${({ theme }) => theme.success};
`
function Login() {
  const dispatch = useDispatch()
  const isTheme = useSelector(selectIsDark)
  const isLogin = useSelector(selectIsLoginPage)
  const isLoading = useSelector(selectIsLoading)
  const Msg = useSelector(selectMessage)
  const info = useSelector(selectInfo)
  const formData = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(loginPost({ formData, isLogin }))
  }

  return (
    <Section>
      <LoginBlock>
        <Header>
          <LogoImage alt='logo' src='public/DSLogo.png' />
          鼎日能源後台管理系統
        </Header>
        <Form onSubmit={handleSubmit} ref={formData}>
          <Account>
            <Input name='account' placeholder='帳號' type='text' required />
          </Account>
          {isLogin ? (
            <Password>
              <Input
                name='password'
                placeholder='密碼'
                type='password'
                required
                isTheme={isTheme}
              />
            </Password>
          ) : (
            <Email>
              <Input
                name='email'
                placeholder='信箱'
                type='email'
                required
                autoComplete='email'
              />
            </Email>
          )}
          {Msg && <Warning>{Msg}</Warning>}
          {info && <Info>{info}</Info>}
          <Button type='submit' disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} pulse />
            ) : isLogin ? (
              '登入'
            ) : (
              '送出'
            )}
          </Button>
        </Form>
        <ForgetAnchor type='button' onClick={() => dispatch(switchPageButton())}>
          {isLoading ? null : isLogin ? '忘記密碼?' : '返回'}
        </ForgetAnchor>
      </LoginBlock>
    </Section>
  )
}

export default Login

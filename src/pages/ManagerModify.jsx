import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import VerifyLayout from '../components/VerifyLayout.jsx'
import {
  selectModifyData,
  selectMenuList,
  selectActive,
  selectLoading,
  selectMessage,
  switchModifyPage,
  modifyBasicInfoSubmit,
  modifyPasswordSubmit
} from '../features/manager/managerSlice.js'
import { selectIsDark } from '../features/switch/switchSlice.js'

const Main = styled.main`
  margin-top: 2rem;
  padding: 2rem 3rem;
  padding-right: 0;
  max-height: calc(100% - 64px - 2rem);
  min-height: 232px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 1.5rem;
  display: flex;
`
const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  cursor: progress;
`
const Nav = styled.ul`
  width: 30%;
  border-right: 2px solid ${({ theme }) => theme.secondary};
  padding: 0.75rem;
`
const HoverAct = keyframes`
  50% {
    translate: -.5rem;
  }
  100% {
    translate: 0;
  }
`
const List = styled.li`
  width: 60%;
  /* margin-left: auto; */
  text-align: end;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 1.35rem;
  cursor: pointer;
  position: relative;

  ::before {
    content: '▶';
    display: ${({ props }) => props.index !== props.active && 'none'};
    position: absolute;
    left: 1rem;
  }

  :hover {
    background-color: ${({ props }) => (props.isDark ? '#20272c' : '#c4c1c1')};

    ::before {
      content: '▶';
      display: block;
      position: absolute;
      left: 1rem;
      animation: ${HoverAct} 0.5s infinite linear;
    }
  }
`
const Form = styled.form`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`
const Field = styled.input`
  width: clamp(350px, 40%, 390px);
  color: ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.primary};
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: 2px solid ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  padding: 0.5rem 1rem;
  outline: none;
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.secondary + '4a'};
    font-weight: 600;
  }
`
const Button = styled.button`
  width: 40%;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 25px;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryActive};
  }
`
const SaveIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  pointer-events: none;
`
const PasswordForm = styled(Form)`
  flex-direction: row;
  justify-content: center;
  position: relative;
`
const PasswordInput = styled(Field)`
  width: 60%;
  text-align: start;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 18px;
  padding: 0.5rem 1.75rem;

  &::-ms-reveal {
    filter: ${(props) => (props.isDark ? 'invert(100%)' : 'invert(0%)')};
  }
`
const PasswordButton = styled(Button)`
  width: 20%;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
`
const MsgAnimation = keyframes`
  50% {
    opacity: 1;
  }
  100% {
    opacity: .001;
  }
`
const MessageBox = styled.form`
  position: absolute;
  top: 0;
  opacity: 0;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.success};
  animation: ${MsgAnimation} 2s;
`

function ManagerModify() {
  const dispatch = useDispatch()
  const formData = useRef()
  const passwordData = useRef()
  const data = useSelector(selectModifyData)
  const isDark = useSelector(selectIsDark)
  const menuList = useSelector(selectMenuList)
  const active = useSelector(selectActive)
  const isLoading = useSelector(selectLoading)
  const msg = useSelector(selectMessage)

  return (
    <VerifyLayout>
      <Main>
        {isLoading && <Cover></Cover>}
        <Nav>
          {menuList.map((li, index) => (
            <List
              key={index}
              props={{ index, isDark, active }}
              onClick={() => dispatch(switchModifyPage(index))}
            >
              {li}
            </List>
          ))}
        </Nav>
        {!active ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              dispatch(
                modifyBasicInfoSubmit({
                  formData: formData.current,
                  mid: data.id
                })
              )
            }}
            ref={formData}
          >
            <Field
              name='name'
              type='text'
              placeholder='名稱'
              defaultValue={data?.name}
              required
            />
            <Field
              name='account'
              type='text'
              placeholder='帳號'
              defaultValue={data?.account}
              required
            />
            <Field
              name='email'
              type='email'
              placeholder='信箱'
              defaultValue={data?.email}
              required
            />
            <Button type='submit' disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} pulse />
              ) : (
                <>
                  <SaveIcon icon={faFloppyDisk} />
                  儲存
                </>
              )}
            </Button>
          </Form>
        ) : (
          <PasswordForm
            ref={passwordData}
            onSubmit={(e) => {
              e.preventDefault()
              dispatch(
                modifyPasswordSubmit({
                  passwordData: passwordData.current,
                  mid: data.id
                })
              )
              e.target.children[0].value = ''
            }}
          >
            <PasswordInput
              type='password'
              placeholder='輸入新的密碼'
              required
              isDark={isDark}
            />
            <PasswordButton type='submit'>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} pulse /> : '確認'}
            </PasswordButton>
            {msg && <MessageBox>{msg}</MessageBox>}
          </PasswordForm>
        )}
      </Main>
    </VerifyLayout>
  )
}

export default ManagerModify

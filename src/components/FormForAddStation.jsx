import React, { useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  modalToggle,
  selectIsOpen,
  selectIsDark
} from '../features/switch/switchSlice'
import Modal from './Modal.jsx'
import { selectLoading } from '../features/station/stationSlice'

const Cancel = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  cursor: pointer;

  > path {
    pointer-events: none;
  }
`
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
`
const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
`
const MainContent = styled.main`
  width: 100%;
  display: flex;
  gap: 4rem;
`
const Side = styled.aside`
  display: flex;
  flex-direction: column;
`
const Name = styled.label`
  display: flex;
  align-items: center;
  width: 280px;
  height: 45px;
  margin: 1rem 0;
  border-bottom: 1.5px solid ${({ theme }) => theme.secondary};

  ::before {
    content: '\f2bb';
    font: var(--fa-font-solid);
    width: 15%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.55rem;
  }
`
const Account = styled(Name)`
  ::before {
    content: '\f007';
  }
`
const Password = styled(Name)`
  ::before {
    content: '\f023';
  }
`
const Email = styled(Name)`
  ::before {
    content: '\f0e0';
  }
`
const Select = styled.label`
  position: relative;
  width: 260px;
  height: 45px;
  margin: 1rem 0;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  border-bottom: 1.5px solid ${({ theme }) => theme.secondary};
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 45px;

  ::after {
    display: block;
    content: '\f0d7';
    font: var(--fa-font-solid);
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem;
    font-size: 1.25rem;
    pointer-events: none;
  }

  // 若設 display: none; 會導致 required 的功能失效
  // 所以這裡才會設定透明
  > input {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
const Placeholder = styled.p`
  color: ${({ theme }) => theme.secondary + '5a'};
`
const Input = styled.input`
  width: 85%;
  height: 100%;
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: none;
  padding: 0.5rem 1rem;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.secondary + '5a'};
    font-weight: 600;
    letter-spacing: normal;
  }

  :focus ::placeholder {
    color: ${({ theme }) => theme.secondary};
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.secondary};
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-ms-reveal {
    filter: ${(props) => (props.isTheme ? 'invert(100%)' : 'invert(0%)')};
  }
`
const Optgroup = styled.ul`
  position: relative;
  /* bottom: 2rem; */
  z-index: 99;
  width: 100%;
  display: ${(props) => (props.menuName === props.activeName ? 'flex' : 'none')};
  /* opacity: 0; */
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  margin-top: 0.75rem;
  border-radius: 15px;
`
const Option = styled.li`
  padding: 0.5rem;

  :hover {
    background-color: ${({ theme }) => theme.primary + '5f'};
  }
`
const Button = styled.button`
  width: 260px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  border-radius: 25px;
  padding: 0.5rem;
  margin-top: 1.25rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.25rem;
  cursor: pointer;
  transition: all 0.1s ease-out;

  &:hover {
    scale: ${({ disabled }) => (disabled ? '1' : '1.05')};
  }
`

function FormForAddStation() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen)
  const isTheme = useSelector(selectIsDark)
  const isLoading = useSelector(selectLoading)

  const formData = useRef()

  // 關掉表單後清空表單所有欄位
  const thisForm = document.getElementById('form')
  const handleCancel = () => {
    dispatch(modalToggle())
    // dispatch(changeAddUserForm())
    thisForm?.reset()
  }

  if (!isOpen) thisForm?.reset()

  return (
    <Modal isLoading={isLoading}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch()
        }}
        ref={formData}
        id='form'
      >
        <Cancel icon={faXmark} onClick={handleCancel} />
        <Title>新增案場</Title>
        {/* <MainContent>
          <Side>
            <Name>
              <Input required placeholder='名稱 (必填)' type='text' name='name' />
            </Name>
            <Account>
              <Input required placeholder='帳號 (必填)' type='text' name='account' />
            </Account>
            <Password>
              <Input
                required
                placeholder='密碼 (必填)'
                type='password'
                name='password'
                isTheme={isTheme}
              />
            </Password>
            <Email>
              <Input placeholder='信箱' type='email' name='email' />
            </Email>
          </Side>
          <Side>
            {env.map((e) => (
              <Select
                key={e.name}
                onClick={() => dispatch(userFormMenuOpen(e.name))}
                htmlFor={e.name}
              >
                {value[e.name]?.name ?? <Placeholder>{e.placeholder}</Placeholder>}
                <Input
                  name={e.name}
                  required={e.name === 'identity'}
                  defaultValue={value[e.name]?.value}
                />
                <Optgroup menuName={e.name} activeName={action}>
                  {e.option.map((item) => (
                    <Option
                      key={item.name}
                      onClick={() => dispatch(changeAddUserForm({ [e.name]: item }))}
                    >
                      {item.name}
                    </Option>
                  ))}
                </Optgroup>
              </Select>
            ))}
          </Side>
        </MainContent> */}
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? '新增' : <FontAwesomeIcon icon={faSpinner} pulse />}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForAddStation

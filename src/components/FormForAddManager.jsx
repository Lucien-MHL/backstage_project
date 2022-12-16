import React, { useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalToggle, selectIsOpen } from '../features/switch/switchSlice'
import { handleSubmit, selectIsLoading } from '../features/manager/managerSlice'
import Modal from './Modal.jsx'

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
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
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
`
const Name = styled.label`
  display: flex;
  align-items: center;
  width: 260px;
  height: 45px;
  margin: 1rem 0;

  ::before {
    content: '\f2bb';
    font: var(--fa-font-solid);
    width: 15%;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.55rem;
    border: 2px solid ${({ theme }) => theme.secondary};
    border-right: none;
    border-radius: 15px 0 0 15px;
  }
`
const Account = styled(Name)`
  ::before {
    content: '\f007';
  }
`
const Email = styled(Name)`
  ::before {
    content: '\f0e0';
  }
`
const Input = styled.input`
  width: 85%;
  height: 100%;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-left: none;
  border-radius: 0 15px 15px 0;
  padding: 0.5rem 1rem;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  :focus ::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
`
const Button = styled.button`
  width: 100%;
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

function FormForAddManager() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen)
  const isLoading = useSelector(selectIsLoading)
  const formData = useRef()

  const handleCancel = () => {
    dispatch(modalToggle())
    document.getElementById('form').reset()
  }

  return (
    <Modal isLoading={isLoading}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(handleSubmit(formData.current))
          e.target.reset()
        }}
        ref={formData}
        id='form'
      >
        {!isLoading && <Cancel icon={faXmark} onClick={handleCancel} />}
        <Title>新增後台人員</Title>
        <Name>
          <Input
            required
            placeholder='名稱'
            type='text'
            name='name'
            disabled={isLoading}
          />
        </Name>
        <Account>
          <Input
            required
            placeholder='帳號'
            type='text'
            name='account'
            disabled={isLoading}
          />
        </Account>
        <Email>
          <Input
            required
            placeholder='信箱'
            type='email'
            name='email'
            autoComplete='email'
            disabled={isLoading}
          />
        </Email>
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? '註冊' : <FontAwesomeIcon icon={faSpinner} pulse />}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForAddManager

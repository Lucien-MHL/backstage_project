import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalToggle, selectIsOpen } from '../features/switch/switchSlice'
import {
  handleSubmit,
  handleChangePhoto,
  selectIsLoading,
  selectPrevPhoto
} from '../features/group/groupSlice'
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
  width: 344px;
  margin: 1rem 0;
`
const dashBorder = css`
  border: 1.5px dashed ${({ theme }) => theme.secondary + '3a'};
`
const noneBorder = css`
  border: none;
`
const Upload = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  width: 344px;
  height: 240px;
  ${({ isBorder }) => (!isBorder ? dashBorder : noneBorder)}
  border-radius: 25px;
  color: ${({ theme }) => theme.secondary + '3a'};
  cursor: pointer;

  > input {
    display: none;
  }
`
const UploadIcon = styled(FontAwesomeIcon)`
  font-size: 4rem;
  margin-bottom: 1rem;
`
const PreviewPhoto = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  width: 344px;
  height: 240px;
  object-fit: contain;
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 25px;
  background-color: #fff;
  pointer-events: none;
`
const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.primary};
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: none;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 15px;
  padding: 0.5rem 1rem;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.secondary + '3a'};
    font-weight: 600;
    text-align: center;
  }

  :focus ::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
`
const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  border-radius: 25px;
  padding: 0.5rem 1rem;
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

function FormForAddGroup() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen)
  const isLoading = useSelector(selectIsLoading)
  const img = useSelector(selectPrevPhoto)
  const formData = useRef()
  const thisForm = document.getElementById('form')
  const handleCancel = () => {
    dispatch(modalToggle())
    dispatch(handleChangePhoto())

    // 關掉表單時，清除表單欄位的值
    thisForm?.reset()
  }

  // 關掉表單時，清除表單欄位的值
  if (!isOpen) thisForm?.reset()

  return (
    <Modal isLoading={isLoading}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(handleSubmit(formData.current))
        }}
        ref={formData}
        id='form'
      >
        <Cancel icon={faXmark} onClick={handleCancel} />
        <Title>新增群組</Title>
        <Name>
          <Input
            required
            placeholder='請輸入群組名稱'
            type='text'
            name='name'
            disabled={isLoading}
          />
        </Name>
        <Upload htmlFor='image' isBorder={img}>
          <UploadIcon icon={faImage} />
          點我新增群組照片
          <Input
            id='image'
            type='file'
            name='photo'
            accept='image/*'
            onChange={(e) => dispatch(handleChangePhoto(e.target))}
            disabled={isLoading}
          />
          {img && <PreviewPhoto src={img} />}
        </Upload>
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? '新增' : <FontAwesomeIcon icon={faSpinner} pulse />}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForAddGroup

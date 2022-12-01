import React, { useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalToggle } from '../features/switch/switchSlice'
import {
  selectGroup,
  selectIsLoading,
  modifyGroupSubmit,
  modifyGroupPhotoChange
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
const Figure = styled.figure`
  position: relative;

  ::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background-color: #000;
    opacity: 0;
    z-index: 1;
    /* transition: opacity 0.3s; */
  }

  :hover::after {
    opacity: 0.67;
    transition: opacity 0.3s;
  }

  :hover > label {
    opacity: 1;
    transition: opacity 0.4s 0.2s;
  }
`
const Upload = styled.label`
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: max-content;
  height: max-content;
  margin: auto;
  font-size: 2.5rem;
  font-weight: 600;
  color: #aaa;
  cursor: pointer;
  z-index: 2;

  :hover {
    color: #fff;
  }

  > input {
    display: none;
  }
`
const UploadIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`
const Photo = styled.img`
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

function FormForModifyGroup() {
  const dispatch = useDispatch()
  const groupData = useSelector(selectGroup)
  const isLoading = useSelector(selectIsLoading)
  const formData = useRef()

  return (
    <Modal isLoading={isLoading}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(
            modifyGroupSubmit({
              formData: formData.current,
              gid: groupData.id,
              imgSrc: groupData.photo
            })
          )
        }}
        ref={formData}
        id='form'
      >
        <Cancel icon={faXmark} onClick={() => dispatch(modalToggle())} />
        <Title>群組修改</Title>
        <Name>
          <Input
            required
            placeholder='請輸入群組名稱'
            type='text'
            name='name'
            defaultValue={groupData.name}
          />
        </Name>
        <Figure>
          <Photo src={groupData.photo} />
          <Upload htmlFor='image'>
            <UploadIcon icon={faRotateRight} />
            變更圖片
            <Input
              id='image'
              type='file'
              name='photo'
              accept='image/*'
              onChange={(e) => dispatch(modifyGroupPhotoChange(e.target.files[0]))}
            />
          </Upload>
        </Figure>
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? '確認修改' : <FontAwesomeIcon icon={faSpinner} pulse />}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForModifyGroup

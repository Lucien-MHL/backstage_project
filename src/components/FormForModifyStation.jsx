import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalToggle } from '../features/switch/switchSlice'
import Modal from './Modal.jsx'
import { selectStationModify } from '../features/station/stationSlice'

const scrollbar = css`
  /* width */
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 0.25rem;
    opacity: 0;
  }
`
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
const FieldContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  height: 360px;
  overflow-y: scroll;
  margin-right: -1rem;
  padding-right: 0.75rem;
  ${scrollbar}
`
const Label = styled.label`
  display: flex;
  align-items: center;
  width: 380px;
  height: 45px;
  margin: 1rem 0;
`
const FieldTitle = styled.p`
  width: 40%;
  text-align: end;
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
  user-select: none;
`
const Input = styled.input`
  width: 60%;
  height: 100%;
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: none;
  border-bottom: 1.5px solid ${({ theme }) => theme.secondary};
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
// const Name = styled.label`
//   width: 344px;
//   margin: 1rem 0;
// `
// const Figure = styled.figure`
//   position: relative;

//   ::after {
//     content: '';
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     width: 100%;
//     height: 100%;
//     border-radius: 25px;
//     background-color: #000;
//     opacity: 0;
//     z-index: 1;
//     /* transition: opacity 0.3s; */
//   }

//   :hover::after {
//     opacity: 0.67;
//     transition: opacity 0.3s;
//   }

//   :hover > label {
//     opacity: 1;
//     transition: opacity 0.4s 0.2s;
//   }
// `
// const Upload = styled.label`
//   position: absolute;
//   opacity: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   width: max-content;
//   height: max-content;
//   margin: auto;
//   font-size: 2.5rem;
//   font-weight: 600;
//   color: #aaa;
//   cursor: pointer;
//   z-index: 2;

//   :hover {
//     color: #fff;
//   }

//   > input {
//     display: none;
//   }
// `
// const UploadIcon = styled(FontAwesomeIcon)`
//   margin-right: 1rem;
// `
// const Photo = styled.img`
//   display: block;
//   width: 344px;
//   height: 240px;
//   object-fit: contain;
//   border: 1.5px solid ${({ theme }) => theme.secondary};
//   border-radius: 25px;
//   background-color: #fff;
//   pointer-events: none;
// `
// const Input = styled.input`
//   width: 100%;
//   color: ${({ theme }) => theme.secondary};
//   background-color: ${({ theme }) => theme.primary};
//   font-size: 1.35rem;
//   font-weight: 600;
//   letter-spacing: 0.15rem;
//   border: none;
//   border: 2px solid ${({ theme }) => theme.secondary};
//   border-radius: 15px;
//   padding: 0.5rem 1rem;
//   outline: none;

//   ::placeholder {
//     color: ${({ theme }) => theme.secondary + '3a'};
//     font-weight: 600;
//     text-align: center;
//   }

//   :focus ::placeholder {
//     color: ${({ theme }) => theme.secondary};
//   }
// `
// const Button = styled.button`
//   background-color: ${({ theme }) => theme.primary};
//   border: 2px solid ${({ theme }) => theme.secondary};
//   color: ${({ theme }) => theme.secondary};
//   border-radius: 25px;
//   padding: 0.5rem 1rem;
//   margin-top: 1.25rem;
//   font-size: 1.5rem;
//   font-weight: 600;
//   letter-spacing: 0.25rem;
//   cursor: pointer;
//   transition: all 0.1s ease-out;

//   &:hover {
//     scale: ${({ disabled }) => (disabled ? '1' : '1.05')};
//   }
// `

function FormForModifyStation() {
  const dispatch = useDispatch()
  const { stationArr } = useSelector(selectStationModify)
  const formData = useRef()

  return (
    <Modal>
      <Form
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   dispatch(
        //     modifyGroupSubmit({
        //       formData: formData.current,
        //       gid: groupData.id,
        //       imgSrc: groupData.photo
        //     })
        //   )
        // }}
        ref={formData}
        id='form'
      >
        <Cancel icon={faXmark} onClick={() => dispatch(modalToggle())} />
        <Title>案場修改</Title>
        <FieldContainer>
          {stationArr?.map((item) => (
            <Label>
              <FieldTitle>{item.name}</FieldTitle>
              <Input />
            </Label>
          ))}
        </FieldContainer>
        <Button type='submit'>
          確認修改
          {/* {!isLoading ? '確認修改' : <FontAwesomeIcon icon={faSpinner} pulse />} */}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForModifyStation

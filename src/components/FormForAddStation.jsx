import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalToggle, selectIsOpen } from '../features/switch/switchSlice'
import Modal from './Modal.jsx'
import {
  selectLoading,
  selectStation,
  selectGroupOpt,
  selectAreaList,
  selectAreaOpt,
  dropMenuOpen,
  postStationStart
} from '../features/station/stationSlice'

const iconBasicStyle = css`
  font: var(--fa-font-solid);
  width: 15%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.55rem;
`
const labelBasicStyle = css`
  display: flex;
  width: 280px;
  height: 45px;
  margin: 1rem 0;
  border-bottom: 1.5px solid ${({ theme }) => theme.secondary};
`
const scrollStyle = css`
  /* width */
  ::-webkit-scrollbar {
    width: 1.5rem;
    border-radius: 0.25rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    width: 0.5rem;
    background-clip: padding-box;
    border: 8px solid rgba(0, 0, 0, 0);
    border-radius: 99rem;
  }
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
const ID = styled.label`
  align-items: center;
  ${labelBasicStyle}

  ::before {
    content: '\f129';
    ${iconBasicStyle}
  }
`
const Name = styled(ID)`
  ::before {
    content: '\f5ba';
  }
`
const Locate = styled.label`
  ${labelBasicStyle}
  position: relative;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 45px;
  user-select: none;

  ::before {
    content: '\f3c5';
    ${iconBasicStyle}
    padding-right: 1rem;
  }

  ::after {
    display: block;
    content: '\f0da';
    font: var(--fa-font-solid);
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem;
    font-size: 1.25rem;
    pointer-events: none;
  }

  // 若設 display: none; 會導致 required 的功能失效
  // 所以這裡要設定透明
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
const Group = styled(Locate)`
  ::before {
    content: '\f5fd';
  }
`
const Placeholder = styled.p`
  text-align: start;
  color: ${({ theme }) => theme.secondary + '5a'};
  user-select: none;
`
const Optgroup = styled.ul`
  position: absolute;
  z-index: 99;
  left: 105%;
  width: 100%;
  height: 260px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  border-radius: 15px;
  ${scrollStyle}
`
const GroupOptgroup = styled(Optgroup)`
  width: max-content;
  height: 345px;
  bottom: 0.45rem;
  text-align: start;
  z-index: 99;
`
const Option = styled.li`
  padding: 0.5rem;
  margin-left: 0.5rem;
  user-select: none;

  :hover {
    background-color: ${({ theme }) => theme.primary + '5f'};
  }
`
const MultiOption = styled(Option)`
  ::before {
    content: '\f00c';
    font: var(--fa-font-solid);
    margin-right: 0.5rem;
    opacity: ${({ isSelect }) => (isSelect ? '1' : '0.15')};
  }
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

  &:active {
    scale: 0.9;
  }
`

function FormForAddStation() {
  const dispatch = useDispatch()
  const isFormOpen = useSelector(selectIsOpen)
  const isLoading = useSelector(selectLoading)
  const areaList = useSelector(selectAreaList)

  const { groupList, placeholder, isOpen } = useSelector(selectStation)

  const formData = useRef()

  // 關掉表單後清空表單所有欄位
  const thisForm = document.getElementById('form')
  const handleCancel = () => {
    dispatch(modalToggle())
    dispatch(selectAreaOpt(null))
    dispatch(selectGroupOpt(false))
    thisForm.reset()
  }

  if (!isFormOpen) thisForm?.reset()

  const clickLabel = (e, str) => {
    e.stopPropagation()
    dispatch(dropMenuOpen(str))
  }

  return (
    <Modal isLoading={isLoading} invoke={() => dispatch(dropMenuOpen(null))}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(postStationStart({ formData, group: placeholder.group }))
        }}
        ref={formData}
        id='form'
      >
        <Cancel icon={faXmark} onClick={handleCancel} />
        <Title>新增案場</Title>
        <ID>
          <Input required placeholder='編號' type='text' name='id' />
        </ID>
        <Name>
          <Input required placeholder='名稱' type='text' name='name' />
        </Name>
        <Locate onClick={(e) => clickLabel(e, 'location')} htmlFor='location'>
          {placeholder.area ? (
            placeholder.area
          ) : (
            <Placeholder>選擇縣市...</Placeholder>
          )}

          <Input required name='location' defaultValue={placeholder.area} />
          <Optgroup isOpen={isOpen === 'location'}>
            {areaList.map((item) => (
              <Option key={item} onClick={() => dispatch(selectAreaOpt(item))}>
                {item}
              </Option>
            ))}
          </Optgroup>
        </Locate>
        <Group onClick={(e) => clickLabel(e, 'group')} htmlFor='group'>
          {placeholder.group?.length ? (
            `已選 ${placeholder.group.length} 個群組`
          ) : (
            <Placeholder>選擇群組...</Placeholder>
          )}
          <Input required name='group' defaultValue={placeholder.group?.length} />
          <GroupOptgroup
            isOpen={isOpen === 'group'}
            onClick={(e) => e.stopPropagation()}
          >
            {groupList?.map(({ name, id, isActive }) => (
              <MultiOption
                key={id}
                onClick={() => dispatch(selectGroupOpt(id))}
                isSelect={isActive}
              >
                {name}
              </MultiOption>
            ))}
          </GroupOptgroup>
        </Group>
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? '新增' : <FontAwesomeIcon icon={faSpinner} pulse />}
        </Button>
      </Form>
    </Modal>
  )
}

export default FormForAddStation

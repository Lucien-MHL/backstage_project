import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VerifyLayout from '../components/VerifyLayout.jsx'
import FormForModifyGroup from '../components/FormForModifyGroup.jsx'
import FormForAddUser from '../components/FormForAddUser.jsx'
import { selectIsDark, modalToggle } from '../features/switch/switchSlice.js'
import {
  faMagnifyingGlass,
  faPlus,
  faPenToSquare,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import {
  selectUsersList,
  selectForm,
  modifySearch,
  formComponent,
  clickUserDetail
} from '../features/group/groupSlice.js'

const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
`
const SearchBar = styled.form`
  width: 300px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 25px;
  position: relative;
`
const SearchIcon = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1rem;
  margin: auto;
`
const Input = styled.input`
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  padding: 0.65rem 1rem;
  padding-left: 3rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.secondary};
    opacity: 0.3;
    font-weight: 600;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`
const PlusButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    font-weight: 600;
    transition: all 0.3s;
  }
`
const PlusIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  pointer-events: none;
`
const EditButton = styled.button`
  background-color: ${({ theme }) => theme.modifyButton};
  color: #fff;
  border-bottom: 4px solid ${({ theme }) => theme.modifyButtonBorder};
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    border-bottom: none;
  }
`
const EditIcon = styled(PlusIcon)`
  width: 1rem;
  padding-left: 0.25rem;
`
const Table = styled.article`
  max-height: calc(100% - 49.458px - 2rem);
  min-height: 120px;
  overflow-y: overlay;
  padding: 0 1rem 0.5rem;

  /* width */
  ::-webkit-scrollbar {
    width: 0.5rem;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0.25rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0.25rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 0.25rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollHover};
  }
`
const TableHeader = styled.section`
  position: sticky;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.primary};
  padding: 0 1.5rem 0.75rem;
`
const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  width: 40%;

  :nth-child(2) {
    width: 50%;
  }

  :nth-child(3) {
    width: 10%;
  }
`
const TableBody = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
`
const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.75rem 0;
  position: relative;

  ::after {
    content: '';
    width: 100%;
    height: 0.5px;
    background-color: ${({ theme }) => `${theme.secondary}3a`};
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    right: 0;
  }

  :last-child::after {
    width: 0;
    height: 0;
  }

  :hover {
    background-color: ${(props) => (props.isDark ? '#20272c' : '#c4c1c1')};
  }

  :last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`
const Text = styled(Title)`
  font-size: 1.25rem;
  font-weight: normal;
  letter-spacing: 0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;

  :nth-child(2) {
    width: 50%;
  }

  :nth-child(3) {
    width: 10%;
  }
`
const Detail = styled(Link)`
  color: ${({ theme }) => theme.secondary};
  border: none;
  padding: 0;
  display: flex;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.secondaryActive};
    background-color: transparent;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`
const DetailIcon = styled(PlusIcon)`
  @media (max-width: 768px) {
    margin: 0;
  }
`
const Font = styled.span`
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`

function GroupModify() {
  const dispatch = useDispatch()
  const list = useSelector(selectUsersList)
  const isDark = useSelector(selectIsDark)
  const form = useSelector(selectForm)
  const keyword = useRef()
  const handleModal = (props) => {
    let component
    if (props === 'Edit') {
      component = <FormForModifyGroup />
    } else {
      component = <FormForAddUser />
    }
    dispatch(formComponent(component))
    dispatch(modalToggle())
  }

  return (
    <VerifyLayout mainDisplay='flex'>
      {/* ↓ '修改群組' 或 '新增使用者' 的表單 */}
      {form}
      {/* ↑ '修改群組' 或 '新增使用者' 的表單 */}

      <Header>
        <SearchBar onSubmit={(e) => e.preventDefault()}>
          <SearchIcon icon={faMagnifyingGlass} />
          <Input
            type='text'
            placeholder='輸入關鍵字...'
            ref={keyword}
            onChange={() => dispatch(modifySearch(keyword.current.value))}
          />
        </SearchBar>
        <ButtonGroup>
          <EditButton type='button' onClick={() => handleModal('Edit')}>
            <EditIcon icon={faPen} />
            修改群組
          </EditButton>
          <PlusButton type='button' onClick={() => handleModal('Plus')}>
            <PlusIcon icon={faPlus} />
            新增
          </PlusButton>
        </ButtonGroup>
      </Header>
      <Table>
        <TableHeader>
          <Title>名稱</Title>
          <Title>帳號</Title>
          <Title>內容</Title>
        </TableHeader>
        <TableBody>
          {list?.map((item, index) => (
            <List key={index} isDark={isDark}>
              <Text>{item.name}</Text>
              <Text>{item.account}</Text>
              <Text>
                <Detail
                  to={`${item.id}`}
                  onClick={() => dispatch(clickUserDetail(item))}
                >
                  <DetailIcon icon={faPenToSquare} />
                  <Font>修改</Font>
                </Detail>
              </Text>
            </List>
          ))}
        </TableBody>
      </Table>
    </VerifyLayout>
  )
}

export default GroupModify

import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import VerifyLayout from '../components/VerifyLayout.jsx'
import { modalToggle } from '../features/switch/switchSlice.js'
import {
  selectGroupList,
  handleClickModify,
  handleSearch
} from '../features/group/groupSlice'
import FormForAddGroup from '../components/FormForAddGroup.jsx'

const Header = styled.article`
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
  width: 20%;
  text-align: center;

  :nth-child(2) {
    width: 80%;
    padding-left: 2.5rem;
  }
`
const TableBody = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 0;
`
const List = styled(Link)`
  display: flex;
  height: 120px;
  margin: 0.5rem 0;
  align-items: center;
  color: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;

  :hover {
    box-shadow: ${({ theme }) => `${theme.secondary}7b`} 2px 1px 12px,
      ${({ theme }) => `${theme.secondary}7b`} -2px 1px 12px;
    transform: scale(1.01);
  }
`
const Logo = styled.figure`
  width: 20%;
  height: 100%;
  background-color: #fff;
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 12px 0 0 12px;
  border-right: none;
`
const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const Text = styled.p`
  width: 80%;
  height: 100%;
  line-height: 120px;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 2.5rem;
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 0 12px 12px 0;
  border-left: none;
`

function Group() {
  const dispatch = useDispatch()
  const list = useSelector(selectGroupList)
  const keyword = useRef()

  return (
    <VerifyLayout mainDisplay='flex'>
      {/* ↓ 新增群組的表單 */}
      <FormForAddGroup />
      {/* ↑ 新增群組的表單 */}

      <Header>
        <SearchBar onSubmit={(e) => e.preventDefault()}>
          <SearchIcon icon={faMagnifyingGlass} />
          <Input
            type='text'
            placeholder='輸入關鍵字...'
            ref={keyword}
            onChange={() => dispatch(handleSearch(keyword.current.value))}
          />
        </SearchBar>

        <PlusButton onClick={() => dispatch(modalToggle())}>
          <PlusIcon icon={faPlus} />
          新增
        </PlusButton>
      </Header>
      <Table>
        <TableHeader>
          <Title>群組照片</Title>
          <Title>名稱</Title>
        </TableHeader>
        <TableBody>
          {list?.map((item, index) => (
            <List
              key={index}
              to={`${item.id}`}
              onClick={() => dispatch(handleClickModify(item))}
            >
              <Logo>
                <Img src={item.photo} alt='company_logo' loading='lazy' />
              </Logo>
              <Text>{item.name}</Text>
            </List>
          ))}
        </TableBody>
      </Table>
    </VerifyLayout>
  )
}

export default Group

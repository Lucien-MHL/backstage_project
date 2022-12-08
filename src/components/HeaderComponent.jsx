import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

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

function HeaderComponent({ children, searchBar, searchRef, plusButton }) {
  return (
    <Header>
      <SearchBar onSubmit={(e) => e.preventDefault()}>
        <SearchIcon icon={faMagnifyingGlass} />
        <Input
          type='text'
          placeholder='輸入關鍵字...'
          ref={searchRef}
          onChange={searchBar}
        />
      </SearchBar>
      <ButtonGroup>
        {children}
        <PlusButton type='button' onClick={plusButton}>
          <PlusIcon icon={faPlus} />
          新增
        </PlusButton>
      </ButtonGroup>
    </Header>
  )
}

export default HeaderComponent

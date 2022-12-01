import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { themeToggle, selectIsDark } from '../features/switch/switchSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  width: 40px;
  height: 20px;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 10px;
    top: 1px;
    left: 1px;
    translate: ${(props) => (props.isTheme ? '0' : '20px')};
    transition: translate 0.3s;
  }
`

const Icon = styled(FontAwesomeIcon)`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.primary};
`

function ThemeButton() {
  const dispatch = useDispatch()
  const isTheme = useSelector(selectIsDark)

  return (
    <Button type='button' isTheme={isTheme} onClick={() => dispatch(themeToggle())}>
      <Icon icon={faSun} />
      <Icon icon={faMoon} />
    </Button>
  )
}

export default ThemeButton

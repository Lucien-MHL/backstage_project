import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  modalToggle,
  noticeEffect,
  selectIsClick,
  selectIsOpen
} from '../features/switch/switchSlice'

const Main = styled.main`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: ${({ theme }) => theme.modalBg};
  backdrop-filter: blur(10px);
`
const shakeEffect = keyframes`
    20% {
        translate: -3px;
    }
    60% {
        translate: 4px;
    }
    65% {
        translate: -5px;
    }
`
const shakeEffectAnimation = css`
  animation: ${shakeEffect} 0.3s linear infinite;
`
const Container = styled.article`
  border: 3px solid ${({ theme }) => theme.secondary};
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => `${theme.secondary}7b`} 0px 4px 12px;
  padding: 1.75rem;
  position: relative;
  ${({ shake }) => shake && shakeEffectAnimation}
`
const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  cursor: progress;
`

function Modal({ children, isLoading }) {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen)
  const isShake = useSelector(selectIsClick)

  return (
    <Main
      isOpen={isOpen}
      onClick={() => {
        dispatch(noticeEffect())
        setTimeout(() => {
          dispatch(noticeEffect())
        }, 350)
      }}
    >
      <Container shake={isShake} onClick={(e) => e.stopPropagation()}>
        {isLoading && <Cover />}
        {children}
      </Container>
    </Main>
  )
}

export default Modal

import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import VerifyLayout from '../components/VerifyLayout.jsx'
import { selectIsDark } from '../features/switch/switchSlice.js'
import { verifyStart } from '../features/verify/verifySlice.js'
import {
  selectStationModify,
  selectLoading,
  navBarClick
} from '../features/station/stationSlice.js'

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  cursor: progress;
`
const Nav = styled.ul`
  width: 30%;
  border-right: 2px solid ${({ theme }) => theme.secondary};
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
`
const HoverAct = keyframes`
  50% {
    translate: -.5rem;
  }
  100% {
    translate: 0;
  }
`
const List = styled.li`
  width: max-content;
  padding: 0.5rem 1.25rem;
  padding-left: 2.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.35rem;
  cursor: pointer;
  position: relative;

  ::before {
    content: '▶';
    display: ${({ props }) => props.index !== props.active && 'none'};
    position: absolute;
    left: 1rem;
  }

  :hover {
    background-color: ${({ props }) => (props.isDark ? '#20272c' : '#c4c1c1')};

    ::before {
      display: block;
      animation: ${HoverAct} 0.5s infinite linear;
    }
  }
`

function StationModify() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const isDark = useSelector(selectIsDark)
  const { menu, active } = useSelector(selectStationModify)
  // const { menu, active, isLoading } = state
  // const { pathname } = useLocation()
  // const props = useParams()
  // const token = JSON.parse(window.sessionStorage.getItem('token'))

  // const handleClick = (i) => {
  //   dispatch(verifyStart({ token, pathname, props }))
  //   dispatch(switchUserModify(i))
  // }

  return (
    <VerifyLayout>
      {isLoading && <Cover></Cover>}
      <Nav>
        {menu.map((li, index) => (
          <List
            key={index}
            props={{ index, isDark, active }}
            onClick={() => dispatch(navBarClick(index))}
          >
            {li}
          </List>
        ))}
      </Nav>
    </VerifyLayout>
  )
}

export default StationModify

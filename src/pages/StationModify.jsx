import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import VerifyLayout from '../components/VerifyLayout.jsx'
import { modalToggle, selectIsDark } from '../features/switch/switchSlice.js'
import { verifyStart } from '../features/verify/verifySlice.js'
import {
  selectStationModify,
  selectLoading,
  navBarClick
} from '../features/station/stationSlice.js'
import FormForModifyStation from '../components/FormForModifyStation.jsx'
import StationComponent from '../components/StationComponent.jsx'

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
  width: 26%;
  border-right: 2px solid ${({ theme }) => theme.secondary};
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  user-select: none;
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
  const { menu, active, stationArr, station } = useSelector(selectStationModify)
  // const { pathname } = useLocation()
  // const props = useParams()
  // const token = JSON.parse(window.sessionStorage.getItem('token'))

  // const handleClick = (i) => {
  //   dispatch(verifyStart({ token, pathname, props }))
  //   dispatch(switchUserModify(i))
  // }

  return (
    <VerifyLayout direction='row'>
      {isLoading && <Cover></Cover>}
      <FormForModifyStation />
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
      {StationComponent[active]}
    </VerifyLayout>
  )
}

export default StationModify

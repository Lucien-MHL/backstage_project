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
const EditButton = styled.button`
  background-color: ${({ theme }) => theme.modifyButton};
  color: #fff;
  border-bottom: 4px solid ${({ theme }) => theme.modifyButtonBorder};
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  width: max-content;
  margin: 1.5rem auto;
  user-select: none;

  :hover {
    opacity: 0.8;
  }

  :active {
    border-bottom: none;
    padding-bottom: 0.75rem;
  }
`
const EditIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  pointer-events: none;
  width: 1rem;
  padding-left: 0.25rem;
`
const ScrollContainer = styled.article`
  width: 74%;
  overflow-y: hidden;
  padding: 0 1.5rem;
  overflow-y: overlay;
  ${scrollbar}
  position: relative;
  text-align: center;

  ::after {
    content: '';
    display: block;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.primary},
      transparent
    );
    width: 100%;
    height: 1.5rem;
    pointer-events: none;
  }
`
const StationProfile = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.primary};
  padding-bottom: 1rem;
`
const Photo = styled.img`
  display: block;
  width: 150px;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  border-radius: 25px;
  pointer-events: none;
`
const Name = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  margin-left: 1.5rem;
`
const Table = styled.table`
  width: 100%;
  margin-top: -1rem;
`
const TableBody = styled.tbody``
const TableRow = styled.tr``
const TableHead = styled.th`
  text-align: start;
  font-size: 1.35rem;
  padding: 0.5rem;
`
const TableData = styled.td`
  font-size: 1.25rem;
  letter-spacing: 0.15rem;
  padding-left: 1rem;
  text-align: start;
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
      {
        [
          <ScrollContainer>
            <StationProfile>
              <Photo src={station.photo} alt={`${station.name}的案場照片`} />
              <Name>{station.name}</Name>
            </StationProfile>
            <Table>
              {stationArr
                ?.filter((e, i) => i !== 1)
                .map((item) => (
                  <TableBody key={item.key}>
                    <TableRow>
                      <TableHead>{item.name}</TableHead>
                      <TableData>{item.value.name ?? item.value}</TableData>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
            <EditButton type='button' onClick={() => dispatch(modalToggle())}>
              <EditIcon icon={faPen} />
              修改案場
            </EditButton>
          </ScrollContainer>,
          <div>Hello ha</div>
        ][active]
      }
    </VerifyLayout>
  )
}

export default StationModify

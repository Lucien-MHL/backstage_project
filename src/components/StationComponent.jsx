import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { selectStationModify } from '../features/station/stationSlice'
import { modalToggle } from '../features/switch/switchSlice'
import Calendar from './Calendar.jsx'

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
  margin-bottom: 1rem;
`
const Photo = styled.img`
  display: block;
  width: 150px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 25px;
  pointer-events: none;
`
const Name = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0 1.5rem;
`
const EditButton = styled.button`
  background-color: ${({ theme }) => theme.modifyButton};
  color: #fff;
  border-bottom: 4px solid ${({ theme }) => theme.modifyButtonBorder};
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  min-width: 124px;
  margin-left: auto;
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

function Modify() {
  const dispatch = useDispatch()
  const { menu, active, stationArr, station } = useSelector(selectStationModify)

  return (
    <ScrollContainer>
      <StationProfile>
        <Photo src={station.photo} alt={`${station.name}的案場照片`} />
        <Name>{station.name}</Name>
        <EditButton type='button' onClick={() => dispatch(modalToggle())}>
          <EditIcon icon={faPen} />
          修改案場
        </EditButton>
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
    </ScrollContainer>
  )
}

function Device() {
  return <div>Device</div>
}

function FloorMap() {
  return <div>FloorMap</div>
}

function Contract() {
  return (
    <div>
      <Calendar />
    </div>
  )
}

function History() {
  return <div>History</div>
}

const StationComponent = [
  <Modify />,
  <Device />,
  <FloorMap />,
  <Contract />,
  <History />
]

export default StationComponent

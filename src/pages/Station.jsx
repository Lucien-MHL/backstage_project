import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import VerifyLayout from '../components/VerifyLayout.jsx'
import HeaderComponent from '../components/HeaderComponent.jsx'
import { selectIsDark, modalToggle } from '../features/switch/switchSlice.js'
import {
  selectStation,
  stationSearchKeyword
} from '../features/station/stationSlice.js'
import FormForAddStation from '../components/FormForAddStation.jsx'
import HighLighter from '../components/HighLighter.jsx'

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

  :nth-child(1) {
    width: 15%;
  }

  :nth-child(2) {
    width: 15%;
  }

  :nth-child(3) {
    width: 50%;
  }

  :nth-child(4) {
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
const DetailIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  pointer-events: none;
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

function Station() {
  const dispatch = useDispatch()
  const keyword = useRef()
  const isDark = useSelector(selectIsDark)
  const station = useSelector(selectStation)
  const handleSearch = () => dispatch(stationSearchKeyword(keyword.current.value))
  const handlePlus = () => dispatch(modalToggle())

  return (
    <VerifyLayout>
      <FormForAddStation />
      <HeaderComponent
        searchBar={handleSearch}
        searchRef={keyword}
        plusButton={handlePlus}
      />
      <Table>
        <TableHeader>
          <Title>編號</Title>
          <Title>縣市</Title>
          <Title>名稱</Title>
          <Title>內容</Title>
        </TableHeader>
        <TableBody>
          {station?.Mut?.map((item) => (
            <List key={item.id} isDark={isDark}>
              <Text>
                <HighLighter text={item.id} search={station.searchText} />
              </Text>
              <Text>
                <HighLighter text={item.location} search={station.searchText} />
              </Text>
              <Text>
                <HighLighter text={item.name} search={station.searchText} />
              </Text>
              {/* <Text>{highLight(item.id)}</Text>
              <Text>{highLight(item.location)}</Text>
              <Text>{highLight(item.name)}</Text> */}
              <Text>
                <Detail
                  to={`${item.id}`}
                  // onClick={() => dispatch(clickUserDetail(item))}
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

export default Station

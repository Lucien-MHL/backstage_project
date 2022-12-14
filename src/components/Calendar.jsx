import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { zhTW } from 'date-fns/locale'
import { format } from 'date-fns'
import {
  selectDate,
  setSelected,
  selectDPisOpen,
  toggleDatePicker
} from '../features/switch/switchSlice'

const Container = styled.section`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const DatePicker = styled(DayPicker)`
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  font-size: 1.15rem;
  padding: 1rem 1.25rem 0.75rem;
  margin: 0;
  border-radius: 15px;

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    opacity: 0.6;
    color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.primary};
  }

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
    color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.primary};
  }

  .rdp-caption {
    position: relative;
  }

  .rdp-caption_label {
    width: 100%;
    display: block;
    text-align: center;
    pointer-events: none;
  }

  .rdp-nav {
    width: 108%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: -4%;

    > button:hover {
      opacity: 1 !important;
    }
  }
`
const BtuGroup = styled.section`
  display: flex;
  gap: 1rem;
  justify-content: end;
  margin-top: 0.5rem;
`
const Correct = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: bold;

  :hover {
    scale: 1.05;
  }

  :active {
    scale: 1;
  }
`
const Cancel = styled(Correct)`
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  border: 1.5px solid ${({ theme }) => theme.primary};
`

function Calendar({ call }) {
  const dispatch = useDispatch()
  const date = useSelector(selectDate)
  const isOpen = useSelector(selectDPisOpen)

  const close = () => dispatch(toggleDatePicker(false))
  const confirmAndClose = () => {
    dispatch(toggleDatePicker(false))
    call(format(date, 'yyyy-MM-dd'))
  }

  const Footer = (
    <BtuGroup>
      <Cancel onClick={close}>取消</Cancel>
      <Correct onClick={confirmAndClose}>確認</Correct>
    </BtuGroup>
  )

  return (
    <Container isOpen={isOpen}>
      <DatePicker
        mode='single'
        locale={zhTW}
        selected={date}
        onSelect={(e) => dispatch(setSelected(e))}
        footer={Footer}
      />
    </Container>
  )
}

export default Calendar

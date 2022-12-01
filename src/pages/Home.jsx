import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import VerifyLayout from '../components/VerifyLayout.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserSecret,
  faUsers,
  faSolarPanel,
  faGears,
  faBullhorn,
  faFolderClosed
} from '@fortawesome/free-solid-svg-icons'

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem 4%;
  margin-top: 2rem;
`
const Card = styled(Link)`
  font-size: 1.25rem;
  text-align: center;
  width: 22%;
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  padding: 1rem 0;

  :hover {
    box-shadow: ${({ theme }) => `${theme.secondary}3a`} 0px 5px 15px;
    transition: all 0.3s;
    & > svg {
      scale: 1.1;
      transition: scale 0.3s;
    }
  }
`

const Icon = styled(FontAwesomeIcon)`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
`

const Text = styled.p`
  font-weight: 600;
  line-height: 2rem;
`

function Home() {
  return (
    <VerifyLayout>
      <Main>
        <Card to='/managers'>
          <Icon icon={faUserSecret} />
          <Text>管理員</Text>
        </Card>
        <Card to='/group'>
          <Icon icon={faUsers} />
          <Text>群組管理</Text>
        </Card>
        <Card to='/stations'>
          <Icon icon={faSolarPanel} />
          <Text>案場管理</Text>
        </Card>
        <Card to='/bulletins'>
          <Icon icon={faBullhorn} />
          <Text>公告管理</Text>
        </Card>
        <Card to='/files'>
          <Icon icon={faFolderClosed} />
          <Text>檔案管理</Text>
        </Card>
        <Card to='/parameters'>
          <Icon icon={faGears} />
          <Text>參數設定</Text>
        </Card>
      </Main>
    </VerifyLayout>
  )
}

export default Home

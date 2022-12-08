import React from 'react'
import { useMatches, Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const Crumbs = styled.ul`
  display: flex;
  font-size: 16px;
  position: absolute;
  bottom: -1.25rem;
  left: 1.25rem;
`
const Crumb = styled.li`
  ::after {
    content: '/';
    position: relative;
    bottom: 1.5px;
    padding: 0 0.75rem;
  }

  :last-child::after {
    display: none;
  }

  :last-child {
    pointer-events: none;
  }

  > a {
    color: ${({ theme }) => theme.secondary};
  }
`
const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.secondary};
`
const HomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.25rem;
  pointer-events: none;
`
function Breadcrumbs() {
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match))
  return (
    <Crumbs>
      <Crumb>
        <CrumbLink to='/'>
          <HomeIcon icon={faHouse} />
          首頁
        </CrumbLink>
      </Crumb>
      {crumbs?.map((crumb, index) => (
        <Crumb key={index}>{crumb}</Crumb>
      ))}
    </Crumbs>
  )
}

export default Breadcrumbs

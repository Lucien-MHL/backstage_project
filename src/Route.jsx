import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectModifyData } from './features/manager/managerSlice'
import { selectGroup, selectUserPageState } from './features/group/groupSlice'
import { selectStationModify } from './features/station/stationSlice'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Managers from './pages/Managers.jsx'
import ManagerModify from './pages/ManagerModify.jsx'
import Group from './pages/Group.jsx'
import GroupModify from './pages/GroupModify.jsx'
import UserModify from './pages/UserModify.jsx'
import Station from './pages/Station.jsx'
import StationModify from './pages/StationModify.jsx'

function Routers() {
  const manager = useSelector(selectModifyData)
  const group = useSelector(selectGroup)
  const { user } = useSelector(selectUserPageState)
  const { station } = useSelector(selectStationModify)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />
        <Route
          path='managers'
          handle={{ crumb: (data) => <Link to={data?.pathname}>管理員</Link> }}
        >
          <Route index element={<Managers />} />
          <Route
            path=':mid'
            element={<ManagerModify />}
            handle={{
              crumb: (data) => <Link to={data?.pathname}>{manager?.name}</Link>
            }}
          />
        </Route>
        <Route
          path='group'
          handle={{ crumb: () => <Link to='/group'>群組管理</Link> }}
        >
          <Route index element={<Group />} />
          <Route
            path=':gid'
            handle={{
              crumb: (data) => <Link to={data?.pathname}>{group?.name}</Link>
            }}
          >
            <Route index element={<GroupModify />} />
            <Route
              path=':uid'
              element={<UserModify />}
              handle={{
                crumb: (data) => <Link to={data?.pathname}>{user?.name}</Link>
              }}
            />
          </Route>
        </Route>
        <Route
          path='station'
          handle={{ crumb: (data) => <Link to={data?.pathname}>案場管理</Link> }}
        >
          <Route index element={<Station />} />
          <Route
            path=':sid'
            element={<StationModify />}
            handle={{
              crumb: (data) => <Link to={data?.pathname}>{station?.name}</Link>
            }}
          />
        </Route>
        <Route path='login' element={<Login />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default Routers

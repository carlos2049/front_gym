import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes as Switch, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import Profile from '../views/Profile';
// import DefaultLayout from '../layouts/DefaultLayout';
import Users from '../views/Users';
import Profiles from '../views/Profiles';
import Permissions from '../views/Permissions';
import Plans from '../views/Plan';
import Subplans from '../views/Subplans';
import Login from '../views/Login';
const lazyLoad = (component: any) => lazy(async () => component);
const DefaultLayout = lazyLoad(import('../layouts/DefaultLayout'))
const Routes = () => {
  const [log, setLog] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const isToken = !!localStorage.getItem('accessToken')
    if (accessToken || isToken) {
      localStorage.setItem('accessToken', accessToken || localStorage.getItem('accessToken'))
      setLog(true)
    }
    if (!isToken) {
      setLog(false)

    }
    console.log('isToken', isToken);
    console.log('accessToken', accessToken);
  }, [accessToken])


  return (
    <Suspense fallback={null} >
      <BrowserRouter>
        {
          log ?
            <Switch>
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
              <Route path="/" element={<DefaultLayout />}>
                <Route path="users" element={<Users />} />
                <Route path="permissions" element={<Permissions />} />
                <Route path="profiles" element={<Profiles />} />
                <Route path="plans" element={<Plans />} />
                <Route path="subplans" element={<Subplans />} />
              </Route>
            </Switch> :
            <Switch>
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
              <Route path='/login' element={<Login />} />

            </Switch>
        }
      </BrowserRouter>
    </Suspense >
  )

}


export default Routes
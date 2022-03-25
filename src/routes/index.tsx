import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
// import Profile from '../views/Profile';
// import DefaultLayout from '../layouts/DefaultLayout';
import Users from '../views/Users';
import Profiles from '../views/Profiles';
import Permissions from '../views/Permissions';
const lazyLoad = (component: any) => lazy(async () => component);
const DefaultLayout = lazyLoad(import('../layouts/DefaultLayout'))
const Routes = () => {
  return (
    <Suspense fallback={null} >
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="profiles" element={<Profiles />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense >
  )

}


export default Routes
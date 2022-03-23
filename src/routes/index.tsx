import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
// import Profile from '../views/Profile';
import DefaultLayout from '../layouts/DefaultLayout';
const lazyLoad = (component: any) => lazy(async () => component);

const Routes = () => {
  return (
    <Suspense fallback={null} >
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<DefaultLayout />}>

          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense >
  )

}

export default Routes
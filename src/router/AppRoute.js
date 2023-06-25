import React from 'react'
//import { LoginScreen } from '../components/login/LoginScreen';
import { Routes, Route,BrowserRouter } from "react-router-dom";
import { DashboardRoutes } from './DashboardRoute';
//import { PrivateRoute } from './PrivateRoute';
//import { PublicRoute } from './PublicRoute';

export const AppRoute = () => {
  return (
    <BrowserRouter>
       
        <Routes>
        {/*<Route path="login" element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        } 
        />*/}
        <Route path="/*" element={
            <DashboardRoutes/>
        }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

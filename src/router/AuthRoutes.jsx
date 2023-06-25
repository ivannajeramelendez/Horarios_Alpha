

import { Route, Routes,Navigate } from 'react-router-dom'
import { LoginPages } from '../auth/LoginPages'
export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPages/>}/>
        <Route path='/*' element={<Navigate to='/auth/login'/>}/>
    </Routes>
  )
}

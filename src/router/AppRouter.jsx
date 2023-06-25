import { Route, Routes,Navigate } from "react-router-dom"
import { DashboardRoutes } from "../dashboard/router/DashboardRoutes"
import { AuthRoutes } from "./AuthRoutes"
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { startLoadingActividades, startLoadingSalas, startLoadingTecnicos } from "../store/dashboard/thunks";


export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingActividades());
    dispatch(startLoadingTecnicos());
    dispatch(startLoadingSalas());
    
  }, []);
  return (
    <Routes>
        <Route path='/*' element={<DashboardRoutes/>}/>
        <Route path='/auth/*' element={<AuthRoutes/>}/>
      <Route path='/*' element={<Navigate to='/auth/login'/>}/>

       
    </Routes>
  )
}

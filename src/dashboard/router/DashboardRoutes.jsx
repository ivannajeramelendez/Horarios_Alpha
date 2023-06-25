import { DashboardPages } from '../components/DashboardPages';
import {Routes,Route,Navigate} from 'react-router-dom';
import Aside from '../components/Aside';
import 'react-pro-sidebar/dist/css/styles.css';
import { Salas } from '../pages/Salas';
import { Tecnicos } from '../pages/Tecnicos';
import { Menu } from '../pages/Menu';
import { Actividades } from '../pages/Actividades';
import { EditarSalaPage } from '../pages/EditarSalaPage';
import { EditarTecnicoPage } from '../pages/EditarTecnicoPage';
import { EditarActividadPage } from '../pages/EditarActividadPage';
import { HorarioFitness } from '../pages/HorarioFitness';

export const DashboardRoutes = () => {
  return (
    <>
    <Aside />
    <Routes>
        <Route path='/crearHorario' element={<DashboardPages/>}/>
        <Route path='/actualizarHorario' element={<Menu/>}/>
        <Route path='/actividades' element={<Actividades/>}/>
        <Route path='/tecnicos' element={<Tecnicos/>}/>
        <Route path='/A2' element={<Salas club='Club Alpha 2'/>}/>
        <Route path='/A3' element={<Salas club='Club Alpha 3'/>}/>
        <Route path='/SP' element={<Salas club='Sports Plaza'/>}/>
        <Route path='/CIM' element={<Salas club='CIMERA'/>}/>
        <Route path="/editarSala/:salaId" element={<EditarSalaPage />} />
        <Route path="/editarTecnico/:tecnicoId" element={<EditarTecnicoPage />} />
        <Route path="/editarActividad/:actividadId" element={<EditarActividadPage />} />
        <Route path="/horarioFitness" element={<HorarioFitness />} />
        {/* <Route path="crearSala/:salaId" element={<EditarSalaPage />} /> */}
    </Routes>
    </>
  )
}

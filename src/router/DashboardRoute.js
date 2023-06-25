import  {Navbar}  from "../ui/NavBar"
import { Routes, Route } from "react-router-dom";
import { Tecnico } from "../screens/Tecnico";
import { Actividad } from "../screens/Actividad";
import { Lugar } from "../screens/Lugar";
import { Home } from "../screens/Home";


export const DashboardRoutes = () => {
  return (
    <>
    <Navbar/>

    <div className='container'>
        <Routes>
            <Route path="/tecnico" element={<Tecnico />} />
            <Route path="/actividad" element={<Actividad />} />
            <Route path="/lugar" element={<Lugar />} />
            <Route path="/" element={<Home />} />
        </Routes>

    </div>

    
    </>
  )
}

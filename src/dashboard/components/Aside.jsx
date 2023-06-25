import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter
} from "react-pro-sidebar";
import { FaRunning } from "react-icons/fa";
import {MdSchedule,MdOutlineRoom,MdLogout} from "react-icons/md";
import {BsPeople,BsArrowRightCircleFill,BsArrowLeftCircleFill} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../../store/dashboard/dashboardSlice";

export default function Aside() {
  const {collapsed}=useSelector(state=>state.dashboard);
  const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        //dispatch({type: types.logout});
        navigate('/auth/login',{
            replace:true
          });
    }
    const onCollapsed=()=>{
        dispatch(setCollapsed(!collapsed));
    }

  return (
    <ProSidebar className="sidebar" collapsed={collapsed}>     
      <SidebarContent >
        <Menu iconShape="circle">
          <MenuItem icon={collapsed?<BsArrowRightCircleFill />:<BsArrowLeftCircleFill />} onClick={onCollapsed}></MenuItem>
          <SubMenu title="Horarios" icon={<MdSchedule/>}>
            <MenuItem>Crear Horario Nuevo <Link to="/crearHorario" /></MenuItem>
            <MenuItem>Actualizar Horario Existente <Link to="/actualizarHorario" /></MenuItem>
            <MenuItem>Modificar Horario Fitness <Link to="/horarioFitness" /></MenuItem>
           </SubMenu>
            <MenuItem icon={<FaRunning/>}>Actividades <Link to="/actividades" /></MenuItem>
            <MenuItem icon={<BsPeople/>}>Tecnicos <Link to="/tecnicos" /></MenuItem>
           <SubMenu title="Salas" icon={<MdOutlineRoom/>}>
            <MenuItem>Club Alpha 2<Link to="/A2" /></MenuItem>
            <MenuItem>Club Alpha 3<Link to="/A3" /></MenuItem>
            <MenuItem>Sports Plaza<Link to="/SP" /></MenuItem>
            <MenuItem>CIMERA <Link to="/CIM" /></MenuItem>
           </SubMenu>
        </Menu>
        
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <MenuItem 
            className="sidebar-btn-wrapper" 
            onClick={handleLogout}
            style={{cursor:'pointer'}}
            icon={<MdLogout/>}
        >
            
        </MenuItem>
      </SidebarFooter>
    </ProSidebar>
  );
}

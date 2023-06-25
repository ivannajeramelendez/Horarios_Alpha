import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalasByClub } from "../../helpers/filtrarClubSalas";
import { SortArray } from "../../helpers/ordenarArray";
import { useForm } from "../../hooks/useForm";
import { eliminarSala, newSala } from "../../store/dashboard/thunks";
import { Input } from "../components/Input";
import {
  Link
} from "react-router-dom";
import {MdOutlineDeleteOutline,MdOutlineModeEdit} from "react-icons/md";

export const Salas = ({club}) => {
  const initialState={
    nombre:''
  }
  const { salas,collapsed } = useSelector( state => state.dashboard );
  const [formularioActive, setFormularioActive] = useState(true);
  const{nombre,handleInputChange}=useForm(initialState);
  const dispatch=useDispatch();
  const salasPorClub=getSalasByClub(club,salas);
  const s = salasPorClub.sort(SortArray);

  
  const onClickNewSala=()=>{
      setFormularioActive(!formularioActive);
  }
  const onSubmit=(event)=>{
    event.preventDefault();
    let idClub;
    switch (club) {
      case 'Club Alpha 2':
        idClub=2;
        break;
      case 'Club Alpha 3':
        idClub=3;
        break;
      case 'Sports Plaza':
        idClub=4;
        break;
      case 'CIMERA':
        idClub=5;
        break;
    }
    dispatch(newSala({nombre:nombre.toUpperCase() ,club:idClub}));
  }
  const deleteSala=(id)=>{
    dispatch(eliminarSala({id}));
  }

  return (
    <>
    <div className={collapsed?'principal-collapsed':'principal'}>
      <h1 className="">Salas de {club}</h1>
      <p className="">Salas registradas en este club: {s.length}</p>
      <button className="button-principal" onClick={onClickNewSala}>Crear Nueva Sala</button>
      <form className="formulario animate__animated animate__fadeIn" hidden={formularioActive}  onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}} >
        <h1>Llene los campos para crear una nueva sala</h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre de la nueva sala'/>        
        <button type="submit" className="button-principal" >Crear</button>
      </form>
      <div className="cards">
    {
      s.map(sala=>(
          <div key={sala.id}className="card animate__animated animate__fadeIn">
          <div className="container">
            <h4><b>{sala.nombre}</b></h4>
            <Link className="button"  to={"/editarSala/"+sala.id}><MdOutlineModeEdit/> </Link>
            {/* <button className="button" >Editar</button> */}
            <button  className="button-eliminar" onClick={() => deleteSala(sala.id)} ><MdOutlineDeleteOutline/></button>
          </div>
        </div>
      ))
  }</div>
  </div>
  </>
  )
}

import { useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SortArray } from "../../helpers/ordenarArray";
import { useForm } from "../../hooks/useForm";
import { eliminarTecnico, newTecnico } from "../../store/dashboard/thunks";
import { Input } from "../components/Input";
const initialState={
  nombre:''
}

export const Tecnicos = () => {
  
  const { tecnicos,collapsed } = useSelector( state => state.dashboard );  
  const [formularioActive, setFormularioActive] = useState(true);
  const dispatch=useDispatch();
  const arrayForSort = [...tecnicos]
  const s = arrayForSort.sort(SortArray);
  
  const{nombre,handleInputChange}=useForm(initialState);

  
  const onClickNewSala=()=>{
    setFormularioActive(!formularioActive);
  }

  const onSubmit=(event)=>{
    event.preventDefault();
    dispatch(newTecnico({nombre}));
  }
  const deleteTecnico=(id)=>{
    dispatch(eliminarTecnico({id}));
  }
  return (
    <> 
    <div className={collapsed?'principal-collapsed':'principal'}>
      <h1>Lista de tecnicos</h1>
      <p className="">Tecnicos registrados : {s.length}</p>
      <button className="button-principal" onClick={onClickNewSala}>Crear Nuevo Tecnico</button>
      <form className="formulario animate__animated animate__fadeIn" hidden={formularioActive}  onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}} >
        <h1>Llene los campos para crear un nuevo tecnico</h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre de la nueva sala'/>        
        <button type="submit" className="button-principal" >Crear</button>
      </form>
      <div className="cards">
    {
      s.map(tecnico=>(
          <div key={tecnico.id}className="card animate__animated animate__fadeIn">
          <div className="container">
            <h4><b>{tecnico.nombre}</b></h4>
            <Link className="button"  to={"/editarTecnico/"+tecnico.id}><MdOutlineModeEdit/> </Link>
            <button  className="button-eliminar" onClick={() => deleteTecnico(tecnico.id)} ><MdOutlineDeleteOutline/></button>
          </div>
        </div>
      ))
  }</div>
  </div>
  </>
  )
}

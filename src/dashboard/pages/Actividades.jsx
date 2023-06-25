import { useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SortArray } from "../../helpers/ordenarArray";
import { useForm } from "../../hooks/useForm";
import { eliminarActividad, newActividad } from "../../store/dashboard/thunks";
import { Input } from "../components/Input";
const initialState={
  nombre:'',
  dificultad:'',
  cupo:0,
  paga:0,
  color:'#ffffff',
  actividad:false,
  fitness:false
}

export const Actividades = () => {
  const { actividades,collapsed } = useSelector( state => state.dashboard );
  const [formularioActive, setFormularioActive] = useState(true);
  const{nombre,color,dificultad,cupo,paga,actividad,fitness,handleInputChange}=useForm(initialState);
  const dispatch=useDispatch();
  const arrayForSort = [...actividades]
  const s = arrayForSort.sort(SortArray);
  
  const onClickNewSala=()=>{
    setFormularioActive(!formularioActive);
  }

  const onSubmit=(event)=>{
    event.preventDefault();
    dispatch(newActividad({nombre,dificultad,paga,max:cupo,segmentacion:actividad,color:color.replace('#',''),sobreescribir:fitness}));
  }
  
  const deleteActividad=(id)=>{
    dispatch(eliminarActividad({id}));
  }
  return (
    <>
    <div className={collapsed?'principal-collapsed':'principal'}>
      <h1>Lista de Actividades</h1>
      <button className="button-principal" onClick={onClickNewSala}>Crear Nueva Actividad</button>
      <form className="formulario animate__animated animate__fadeIn" hidden={formularioActive}  onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}} >
        <h1>Llene los campos para crear una nueva actividad</h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre de la nueva actividad'/>  
        <Input tipo='text' nombre='dificultad' valor={dificultad} handle={handleInputChange} label='Dificultad'/>  
        <Input tipo='number' nombre='cupo' valor={cupo} handle={handleInputChange} label='Cupo Maximo'/> 
        <Input tipo='number' nombre='paga' valor={paga} handle={handleInputChange} label='Paga'/> 
        <div className="checkbox">
          <input  type="checkbox" checked={actividad} name='actividad' onChange={handleInputChange}  id="checkbox1" /> <label htmlFor="checkbox1">{actividad?'Cancha':'Actividad'}  </label>
          <input  type="checkbox" checked={fitness} name='fitness' onChange={handleInputChange}  id="checkbox2" /> <label htmlFor="checkbox2">{fitness?'Es fitness':'No es fitness'}  </label>
          </div> 
        <div>
          <input name="color" style={{borderRadius:'5px',margin:'30px 15px 30px 0px',backgroundColor:'#FFFFFF',border: "1px solid rgb(205, 205, 205)",width:'80px',height:'30px'}} value={color} onChange={handleInputChange} type="color" />
          Elige el color
        </div>
            
        <button type="submit" className="button-principal"  >Crear</button>
      </form>
      <div className="cards ">
    {
      s.map(actividad=>(
          <div key={actividad.id}className="card animate__animated animate__fadeIn"  style={{border: "3px solid #"+actividad.tipoActividad.color,borderRadius:'5px'}}>
          <div className="container">
            <h3 >{actividad.nombre}</h3>
            <h4 >{actividad.segmentacion?'Cancha':'Actividad'} con cupo : {actividad.max}</h4>    
            <p style={{color:actividad.paga===0?'red':'blue'}}>{actividad.paga===0?'Clase sin cobro':'Clase de cobro'}</p>    
            <Link className="button"  to={"/editarActividad/"+actividad.id}><MdOutlineModeEdit/> </Link>
            <button  className="button-eliminar"  onClick={() => deleteActividad(actividad.id)}><MdOutlineDeleteOutline/></button>
          </div>
        </div>
      ))
  }</div>
  </div>
  </>
  )
}

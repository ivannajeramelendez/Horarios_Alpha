import  { useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import { findSalaById } from '../../helpers/findSalaById';
import { useForm } from '../../hooks/useForm';
import { updateActividad,  } from '../../store/dashboard/thunks';
import { Input } from '../components/Input';



export const EditarActividadPage = () => {
    const { collapsed ,actividades} = useSelector( state => state.dashboard );
    const {actividadId} = useParams();
    const actividadInd=useMemo(() => findSalaById(actividadId,actividades), [actividadId]);
    const dispatch=useDispatch();    
    const{nombre,dificultad,cupo,paga,actividad,fitness,color,handleInputChange}=useForm({nombre:actividadInd.nombre,dificultad:actividadInd.dificultad,cupo:actividadInd.max,paga:actividadInd.paga,actividad:actividadInd.segmentacion,fitness:actividadInd.sobreescribir,color:'#'+actividadInd.tipoActividad.color});
    const navigate=useNavigate();


    const handleReturn=()=>{
      navigate(-1);
    }
    const onSubmit=(event)=>{      
      event.preventDefault();
      dispatch(updateActividad({id:actividadInd.id,nombre,dificultad,max:cupo,paga,segmentacion:actividad,sobreescribir:fitness,tipoActividad:{color:color.replace('#','')}}));
      navigate(-1);
    }
    
  return (
    <div className={collapsed?'principal-collapsed':'principal'}>
    <button onClick={handleReturn} className="button-principal" style={{marginTop:'50px',color:'#88BBF3',border: "2px solid #88BBF3"}}>Regresar</button>
    <form className="formulario animate__animated animate__fadeIn" onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',width:collapsed?'420%':'370%',transitionDuration:'0.3s'}} >
        <h1>Editar Actividad </h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre de la nueva actividad'/>  
        <Input tipo='text' nombre='dificultad' valor={dificultad} handle={handleInputChange} label='Dificultad'/>  
        <Input tipo='number' nombre='cupo' valor={cupo} handle={handleInputChange} label='Cupo Maximo'/> 
        <Input tipo='number' nombre='paga' valor={paga} handle={handleInputChange} label='Paga'/> 
        <div className="checkbox">
          <input  type="checkbox" checked={actividad} name='actividad' onChange={handleInputChange}  id="checkbox1" /> <label htmlFor="checkbox1">{actividadInd?'Cancha':'Actividad'}  </label>
          <input  type="checkbox" checked={fitness} name='fitness' onChange={handleInputChange}  id="checkbox2" /> <label htmlFor="checkbox2">{fitness?'Es fitness':'No es fitness'}  </label>
          </div> 
        <div>
          <input name="color" style={{borderRadius:'5px',margin:'30px 15px 30px 0px',backgroundColor:'#FFFFFF',border: "1px solid rgb(205, 205, 205)",width:'80px',height:'30px'}} value={color} onChange={handleInputChange} type="color" />
          Elige el color
        </div>
            
        <button type="submit" className="button-principal"  >Actualizar</button>
      </form>
    </div>
  )
}

import  { useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import { findSalaById } from '../../helpers/findSalaById';
import { useForm } from '../../hooks/useForm';
import { updateTecnico } from '../../store/dashboard/thunks';
import { Input } from '../components/Input';

export const EditarTecnicoPage = () => {
    const { collapsed ,tecnicos} = useSelector( state => state.dashboard );
    const {tecnicoId} = useParams();
    const tecnico=useMemo(() => findSalaById(tecnicoId,tecnicos), [tecnicoId]);
    const dispatch=useDispatch();    
    const{nombre,handleInputChange}=useForm({nombre:tecnico.nombre});
    const navigate=useNavigate();


    const handleReturn=()=>{
      navigate(-1);
    }
    const onSubmit=(event)=>{      
      event.preventDefault();
      dispatch(updateTecnico({id:tecnico.id,nombre}));
      navigate(-1);
    }
    
  return (
    <div className={collapsed?'principal-collapsed':'principal'}>
    <button onClick={handleReturn} className="button-principal" style={{marginTop:'50px',color:'#88BBF3',border: "2px solid #88BBF3"}}>Regresar</button>
      <form className="formulario animate__animated animate__fadeIn"  onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',width:collapsed?'500%':'425%',transitionDuration:'0.4s'}} >
        <h1>Editar Tecnico</h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre del tecnico'/> 
             
        <button type="submit" className="button-principal" >Actualizar Tecnico</button>
      </form>
    </div>
  )
}

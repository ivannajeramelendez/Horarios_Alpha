import  { useMemo, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import { findSalaById } from '../../helpers/findSalaById';
import { useForm } from '../../hooks/useForm';
import { Input } from '../components/Input';
import Select from 'react-select';
import { updateSala } from '../../store/dashboard/thunks';

export const EditarSalaPage = () => {
    const { collapsed ,salas} = useSelector( state => state.dashboard );
    const {salaId} = useParams();
    const sala=useMemo(() => findSalaById(salaId,salas), [salaId]);
    const [selectedSala, setSelectedSala] = useState({label:sala.club.nombre,value:sala.club.idClub});

    const dispatch=useDispatch();

    
    const{nombre,handleInputChange}=useForm({nombre:sala.nombre});
    const options=[{value:2,label:"Club Alpha 2"},{value:3,label:"Club Alpha 3"},{value:4,label:"Sports Plaza"},{value:5,label:"CIMERA"}];
    const navigate=useNavigate();


    const handleReturn=()=>{
      navigate(-1);
    }
    const onSubmit=(event)=>{      
      event.preventDefault();
      dispatch(updateSala({id:sala.id,nombre,idClub:selectedSala.value}));
      navigate(-1);
    }
    
  return (
    <div className={collapsed?'principal-collapsed':'principal'}>
    <button onClick={handleReturn} className="button-principal" style={{marginTop:'50px',color:'#88BBF3',border: "2px solid #88BBF3"}}>Regresar</button>
      <form className="formulario animate__animated animate__fadeIn"  onSubmit={ onSubmit }
      style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
      boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',width:collapsed?'500%':'425%',transitionDuration:'0.4s'}} >
        <h1>Editar Sala</h1>
        <Input tipo='text' nombre='nombre' valor={nombre} handle={handleInputChange} label='Nombre de la sala'/> 
        <Select className="Select"
                defaultValue={selectedSala}
                onChange={setSelectedSala}
                options={options}
                
        />       
        <button type="submit" className="button-principal" style={{marginTop:'50px'}}>Actualizar Sala</button>
      </form>
    </div>
  )
}

import React from 'react'
import { useDispatch } from 'react-redux';
import { setActive } from '../../store/dashboard/dashboardSlice';
import { onOpenDateModal } from '../../store/ui/uiSlice';

export const CardFitness = ({card}) => {
  const dispatch=useDispatch();
  const openModal=(event)=>{
    event.preventDefault();
    dispatch(onOpenDateModal());
    dispatch(setActive(card));
  }
  return (
    <div  className="card-fitness animate__animated animate__fadeIn" 
            style={{ border: '2px solid #'+card.color}}>
        <button  style={{backgroundColor:'white',border:'none',cursor:'pointer'}} onClick={openModal}>
            <div className='tag-title' style={{ color: '#'+card.color}}>{card.nombre}</div>
            <div className='tag-sala'>{card.lugar}</div>
            <div  className='tag-instructor'>{card.tecnico}</div>
            <div  className='tag-instructor'>{card.cupo_actual}/{card.cupo_maximo}</div>
            <div  className='tag-instructor'>{card.rango}</div>
            {/* <Link className="button"  to={"/editarSala/"+dia.id}><MdOutlineModeEdit/> </Link> */}
            {/* <button className="button" >Editar</button> */}
            {/* <button  className="button-eliminar" onClick={() => deleteSala(dia.id)} ><MdOutlineDeleteOutline/></button> */}
        </button>
    </div>
  )
}

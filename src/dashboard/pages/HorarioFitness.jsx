import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtrarByDay } from "../../helpers/filtrarClubSalas";
import { onLimpiarHorario } from "../../store/dashboard/dashboardSlice";
import { loadHorarioInicial } from "../../store/dashboard/thunks";
import { CardFitness } from "../components/CardFitness";
import Select from 'react-select';
import { opcionesByClub } from "../../helpers/crearOpciones";
import { BsArrowLeftSquare,BsArrowRightSquare } from "react-icons/bs";
import { ModalFitness } from "../components/ModalFitness";

const curr = new Date; // get current date
const first = curr.getDate() - curr.getDay()+1; 
let firstday = moment(curr.setDate(first));

export const HorarioFitness = () => {
    
    const [selectedActividad, setSelectedActividad] = useState({value:'Club Alpha 2',label:'Club Alpha 2'});    
    const opcionesClub=opcionesByClub();

    const { collapsed,horario,isLoading } = useSelector( state => state.dashboard );    
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(onLimpiarHorario());
        dispatch(loadHorarioInicial(firstday,selectedActividad.value));
    }, [selectedActividad,firstday._d]);
    
    
    const semanaAnterior=(event)=>{
        event.preventDefault();
        firstday =  firstday.add(-7,'day');
        dispatch(onLimpiarHorario());
        dispatch(loadHorarioInicial(firstday,selectedActividad.value));
      }
 
      const semanaSiguiente=(event)=>{
        event.preventDefault();
        firstday =  firstday.add(7,'day');
        dispatch(onLimpiarHorario());
        dispatch(loadHorarioInicial(firstday,selectedActividad.value));
      }
  return (
    <div className={collapsed?'principal-collapsed':'principal'}>
        {
            isLoading?(
                <div>
                    <div className="loader"></div>
                </div>
            ):(
                <div className="formulario" style={{border: "2px solid rgb(205, 205, 205)",padding:'25px 25px 25px 25px',borderRadius:'5px',
                    boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',width:collapsed?'95%':'95%',transitionDuration:'0.1s'}} >
                    <h1>Horarios Fitness</h1>
                    <form >
                        <Select className="Select" 
                            placeholder='Club Alpha 2'          
                            defaultValue={selectedActividad}
                            onChange={setSelectedActividad}
                            options={opcionesClub}                
                        />
                        <button className="button" onClick={semanaAnterior} style={{padding:'5px 5px 0px 5px', margin:'25px 90% -20px 0px',border:'none'}}><BsArrowLeftSquare  size={42}/></button>
                        <button className="button" onClick={semanaSiguiente} style={{padding:'5px 5px 0px 5px', margin:'25px 0px -20px 0px',border:'none'}}><BsArrowRightSquare  size={42}/></button>
                    </form>
                <div className="cards-fitness-grid">
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                        ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Lunes
                        <div>
                            {firstday.clone().format('YYYY-MM-DD')}
                        </div>
                    </div> 
                
                    {
                        filtrarByDay(firstday.format('YYYY-MM-DD'),horario).map(element=>(
                            <CardFitness key={element.idApartados} card={element} />
                        ))
                        
                    }
                </div>
                <div >
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Martes
                        <div>
                            {firstday.clone().add(1,'day').format('YYYY-MM-DD')}
                        </div>
                    </div>
                    {
                        filtrarByDay(firstday.clone().add(1,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))                        
                    }                
                </div>                
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Miercoles
                        <div>
                            {firstday.clone().add(2,'day').format('YYYY-MM-DD')}
                        </div>
                    </div>
                    {
                        filtrarByDay(firstday.clone().add(2,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))
                        
                    }
                </div>
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Jueves
                        <div>
                            {firstday.clone().add(3,'day').format('YYYY-MM-DD')}
                        </div>
                    </div>
                    {
                        filtrarByDay(firstday.clone().add(3,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))
                        
                    }
                </div>
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Viernes
                        <div>
                            {firstday.clone().add(4,'day').format('YYYY-MM-DD')}
                        </div>

                    </div>
                    {
                        filtrarByDay(firstday.clone().add(4,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))                        
                    }
                </div>
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Sabado
                        <div>
                            {firstday.clone().add(5,'day').format('YYYY-MM-DD')}
                        </div>
                    </div>
                    {
                        filtrarByDay(firstday.clone().add(5,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))                        
                    }
                </div>
                <div>
                    <div style={{  border: '2px solid rgb(205, 205, 205)',textAlign:'center',borderRadius:'5px'
                    ,boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)'}}>Domingo
                    
                        <div>
                            {firstday.clone().add(6,'day').format('YYYY-MM-DD')}
                        </div>

                    </div>
                    {
                        filtrarByDay(firstday.clone().add(6,'day').format('YYYY-MM-DD'),horario).map(element=>(
                            
                            <CardFitness key={element.idApartados} card={element} />
                        ))
                    }
                </div>
            </div>
        </div>
        )
    }
        <ModalFitness/>
    </div>
    )
}

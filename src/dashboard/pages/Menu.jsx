import React, { useState } from "react";
import Select from 'react-select';

import { useForm } from "../../hooks/useForm";
import { useSelector,useDispatch } from "react-redux";
import { crearActividades, crearSalas, crearTecnico } from "../../helpers/crearOpciones";
import { startNewHorario } from "../../store/dashboard/thunks";
import moment from "moment";
import { Input } from "../components/Input";


export const Menu=()=> {

    const {collapsed,actividades,tecnicos,salas,isSaving } = useSelector( state => state.dashboard );
    const dispatch=useDispatch();

    
    const [selectedActividad, setSelectedActividad] = useState(null);
    const [selectedTecnico, setSelectedTecnico] = useState(null);
    const [selectedSala, setSelectedSala] = useState(null);

    const opcionesActividades=crearActividades(actividades);
    const opcionesTecnicos=crearTecnico(tecnicos);
    const opcionesSalas=crearSalas(salas);

    const {lunes,martes,miercoles,jueves,viernes,sabado,domingo,periodoInicio,periodoFinal
        ,horaInicio,horaFin,handleInputChange}=useForm({
        lunes:false,
        martes:false,
        miercoles:false,
        jueves:false,
        viernes:false,
        sabado:false,
        domingo:false,
        periodoInicio:"",
        periodoFinal:"",
        horaInicio:"",
        horaFin:""
      })

      const onSubmit=(event)=>{
        event.preventDefault();
        
        const a = new Date("February 12, 2014 "+horaFin);
        const b = new Date("February 12, 2014 "+horaInicio);
        //La diferencia se da en milisegundos así que debes dividir entre 1000
        const c = ((a-b)/60000);
        let contiene=selectedSala.label.includes('Club Alpha 2'); 
        let club='';
        if(!contiene){
            contiene=selectedSala.label.includes('Club Alpha 3'); 
            if(!contiene){
                contiene=selectedSala.label.includes('Sports Plaza'); 
                if(!contiene){                    
                    club='CIMERA'; 
                }else{           
                    club='Sports Plaza'; 

                }
            }else{
                club='Club Alpha 3';
            }
        }else{
            club='Club Alpha 2';
        }
        const data={
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo,
            periodoInicio: moment(periodoInicio).format("DD/MM/YYYY"),
            periodoFinal: moment(periodoFinal).format("DD/MM/YYYY"),
            actividad:selectedActividad.value,
            tecnico:selectedTecnico.value,
            sala:selectedSala.value,
            rango:horaInicio+"-"+horaFin,
            duracion:c,
            hora: horaInicio.split(':')[0]+":00",
            club
        }
        // console.log(data);
        dispatch(startNewHorario(data));
        
      }
  return (
    <div className={collapsed?'principal-collapsed':'principal'}>
    <form className="formulario animate__animated animate__fadeIn"  onSubmit={ onSubmit }>
        <div className="checkbox">
            <input checked={lunes} type="checkbox" name='lunes'  onChange={handleInputChange} id="checkbox1" /> <label htmlFor="checkbox1">Lunes  </label>
            <input checked={martes} type="checkbox" name='martes'  onChange={handleInputChange}  id="checkbox2"/> <label htmlFor="checkbox2">Martes </label>
            <input checked={miercoles} type="checkbox" name='miercoles'  onChange={handleInputChange}  id="checkbox3"/><label htmlFor="checkbox3"> Miercoles  </label>
            <input checked={jueves} type="checkbox" name='jueves'  onChange={handleInputChange}  id="checkbox4"/><label htmlFor="checkbox4"> Jueves  </label>
            <input checked={viernes} type="checkbox" name='viernes'  onChange={handleInputChange}  id="checkbox5"/> <label htmlFor="checkbox5">Viernes  </label>
            <input checked={sabado} type="checkbox" name='sabado'  onChange={handleInputChange}  id="checkbox6"/> <label htmlFor="checkbox6">Sabado </label>
            <input checked={domingo} type="checkbox" name='domingo'  onChange={handleInputChange}  id="checkbox7"/> <label htmlFor="checkbox7">Domingo  </label>
            
            
            <Input tipo='date' nombre='periodoInicio' valor={periodoInicio}
                    handle={handleInputChange} label='Periodo Inicial'/>

            <Input tipo='date' nombre='periodoFinal' valor={periodoFinal}
                handle={handleInputChange} label='Periodo Final'/>

            <Select className="Select"
                placeholder='Seleccione una Actividad'
                defaultValue={selectedActividad}
                onChange={setSelectedActividad}
                options={opcionesActividades}
                
            />
            <Select className="Select"
                placeholder='Seleccione un Tecnico'
                defaultValue={selectedTecnico}
                onChange={setSelectedTecnico}
                options={opcionesTecnicos}
            />
            
            <Select className="Select"
                placeholder='Seleccione una Sala'
                defaultValue={selectedSala}
                onChange={setSelectedSala}
                options={opcionesSalas}
            />           

            <Input tipo='time' nombre='horaInicio' valor={horaInicio}
                handle={handleInputChange} label='Hora de Incio'/>
            
            <Input tipo='time' nombre='horaFin' valor={horaFin}
                handle={handleInputChange} label='Hora de Finalizacion'/>
            <div className="text-box">
                <button style={{cursor:'pointer'}} type="submit" disabled={isSaving} className="btn btn-white btn-animate">Crear Horario Nuevo</button>
            </div>
        </div>
      
    </form>
    </div>
  );
}

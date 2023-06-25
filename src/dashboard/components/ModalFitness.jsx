import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Swal from "sweetalert2";
import { crearActividades, crearSalas, crearTecnico } from "../../helpers/crearOpciones";
import { useForm } from "../../hooks/useForm";
import { onLimpiarActive } from "../../store/dashboard/dashboardSlice";
import { onEditarHorario } from "../../store/dashboard/thunks";
import { onCloseDateModal } from "../../store/ui/uiSlice";
import { Input } from "./Input";


  Modal.setAppElement('#root');  

export const ModalFitness = () => {
  
  const { actividades,tecnicos,salas,active } = useSelector( state => state.dashboard );
  const { isDateModalOpen } = useSelector( state => state.ui );
  const dispatch=useDispatch();
  const closeModal=()=>{
    dispatch(onCloseDateModal());
    dispatch(onLimpiarActive());
  }
  
    
  
  const [selectedActividad, setSelectedActividad] = useState();
  const [selectedTecnico, setSelectedTecnico] = useState();
  const [selectedSala, setSelectedSala] = useState();
  useEffect(() => {
    if(active!==null){

      reset({
        horaInicio:active.rango.split("-")[0],
        horaFin:active.rango.split("-")[1]
      });
      
    }
  
  }, [active])
  

  const {horaInicio,horaFin,handleInputChange,reset}=useForm({
    horaInicio:"",
    horaFin:""
  });

  const opcionesActividades=crearActividades(actividades);
  const opcionesTecnicos=crearTecnico(tecnicos);
  const opcionesSalas=crearSalas(salas);

  const onSubmit=(event)=>{
    event.preventDefault();
    try {
      const a = new Date("February 12, 2014 "+horaFin);
        const b = new Date("February 12, 2014 "+horaInicio);
        //La diferencia se da en milisegundos así que debes dividir entre 1000
        const c = ((a-b)/60000);
      dispatch(onEditarHorario({
        id:active.id,
        sala:{
          id:selectedSala.value
        },
        duracion:c,
        actividad:{
          id:selectedActividad.value
        },
        hora:horaInicio.split(':')[0]+":00",
        rango:horaInicio+"-"+horaFin,
        tecnico:{
          id:selectedTecnico.value
        }
      }));
      dispatch(onLimpiarActive());
      dispatch(onCloseDateModal());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Campos vacíos',
        text: 'No se han llenado algunos campos del formulario',
      });
    }
    
  }
  
  return (    
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={closeModal}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={300}
    >
      <h1>Modificar horario</h1>
      {/* <h1>{JSON.stringify(selectedActividad)}</h1> */}
      <hr/>
        
        <form className="container" onSubmit={onSubmit} >


          <Select className="Select"    
              defaultValue={selectedActividad}
              onChange={setSelectedActividad}
              options={opcionesActividades}    
              placeholder={active?.nombre +" - Cupo:"+active?.cupo_maximo}            
          />
          <Select className="Select" 
              defaultValue={selectedTecnico}
              onChange={setSelectedTecnico}
              options={opcionesTecnicos}        
              placeholder={active?.tecnico}                
          />
          <Select className="Select" 
              defaultValue={selectedSala}
              onChange={setSelectedSala}
              options={opcionesSalas}        
              placeholder={active?.lugar}           
          />
          <Input tipo='time' nombre='horaInicio' valor={horaInicio}
                  handle={handleInputChange} label=''/>
              
          <Input tipo='time' nombre='horaFin' valor={horaFin}
              handle={handleInputChange} label=''/>
          <button
              type="submit"
              className="button"
          >
              <span> Guardar</span>
          </button>
          <button
            onClick={closeModal}
            className="button-eliminar"
          >
              <span> Cancelar</span>
          </button>

          </form>
    </Modal>
      )
}

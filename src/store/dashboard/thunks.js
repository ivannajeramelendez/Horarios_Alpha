import moment from "moment";
import Swal from "sweetalert2";
import { actualizarActividad, actualizarSala, actualizarTecnico, borrarActividad, borrarSala, borrarTecnico, createNewActividad, createNewHorario, createNewSala, createNewTecnico, createNewTipoActividad, editarHorario, loadActividades, loadHorario, loadSalas, loadTecnicos } from "../../helpers/load";
import { actualizarHorario, addNewActividad, addNewSala, addNewTecnico, onAddDiaHorario, onDeleteActividad, onDeleteSala, onDeleteTecnico, onUpdateActividad, onUpdateSala, onUpdateTecnico, savedNewHorario, savingNewHorario, setActividades, setLoading, setSalas, setTecnicos } from "./dashboardSlice";


export const startNewHorario=(data)=>{
    return async(dispatch)=>{
        dispatch(savingNewHorario());
        
        try{
            const respuesta=await createNewHorario(data);
            Swal.fire({
                icon: "success",
                title: 'Horario Guardado',
                text: respuesta,
              });

        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
        
        dispatch(savedNewHorario());
    }
}
export const startLoadingActividades=()=>{
    return async(dispatch)=>{
        const actividades=await loadActividades();
        dispatch(setActividades(actividades));
    }
}

export const startLoadingTecnicos=()=>{
    return async(dispatch)=>{
        const tecnicos=await loadTecnicos();
        dispatch(setTecnicos(tecnicos));
    }
}


export const startLoadingSalas=()=>{
    return async(dispatch)=>{
        const salas=await loadSalas();
        dispatch(setSalas(salas));
    }
}

export const newSala=(nuevaSala)=>{
    return async(dispatch)=>{
        
        try{
            const salaCreada=await createNewSala(nuevaSala);
            dispatch(addNewSala(salaCreada));
            Swal.fire({
                icon: "success",
                title: 'Sala creada Satisfactoriamente',
                text: salaCreada.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}


export const updateSala=(sala)=>{
    return async(dispatch)=>{
        
        try{
            const salaCreada=await actualizarSala(sala);
            dispatch(onUpdateSala(salaCreada));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: salaCreada.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const eliminarSala=(req)=>{
    return async(dispatch)=>{
        try{
            const json=await borrarSala(req);
            dispatch(onDeleteSala(req.id));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: json.msg,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const newTecnico=(nuevoTecnico)=>{
    return async(dispatch)=>{
        
        try{
            const tecnicoNuevo=await createNewTecnico(nuevoTecnico);
            dispatch(addNewTecnico(tecnicoNuevo));
            Swal.fire({
                icon: "success",
                title: 'Tecnico creado Satisfactoriamente',
                text: tecnicoNuevo.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}


export const updateTecnico=(tecnico)=>{
    return async(dispatch)=>{
        
        try{
            const tecnicoCreado=await actualizarTecnico(tecnico);
            dispatch(onUpdateTecnico(tecnicoCreado));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: tecnicoCreado.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const eliminarTecnico=(req)=>{
    return async(dispatch)=>{
        try{
            const json=await borrarTecnico(req);
            dispatch(onDeleteTecnico(req.id));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: json.msg,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}


export const newActividad=(nuevaActividad)=>{
    return async(dispatch)=>{
        
        try{
            const tipoActividadNueva=await createNewTipoActividad({nombre:nuevaActividad.nombre,color:nuevaActividad.color});
            const actividadNueva=await createNewActividad({...nuevaActividad, tipoActividad:tipoActividadNueva.id});
            dispatch(addNewActividad(actividadNueva));
            Swal.fire({
               icon: "success",
               title: 'Actividad creada Satisfactoriamente',
               text: actividadNueva.nombre,
             });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const updateActividad=(actividad)=>{
    return async(dispatch)=>{
        
        try{
            const actividadCreada=await actualizarActividad(actividad);
            dispatch(onUpdateActividad(actividadCreada));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: actividadCreada.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const eliminarActividad=(req)=>{
    return async(dispatch)=>{
        try{
            const json=await borrarActividad(req);
            dispatch(onDeleteActividad(req.id));
            Swal.fire({
                icon: "success",
                title: 'Sala actualizada satisfactoriamente',
                text: json.msg,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}

export const loadHorarioInicial=(dia,club)=>{
    return async(dispatch)=>{
        
        try{
            let  day = dia.clone();
            dispatch(setLoading(true));
            const lunes=await loadHorario(day.format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(lunes));
            const martes=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(martes));
            const miercoles=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(miercoles));
            const jueves=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(jueves));
            const viernes=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(viernes));
            const sabado=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(sabado));
            const domingo=await loadHorario(day.add(1,'day').format('YYYY-MM-DD'),club);
            dispatch(onAddDiaHorario(domingo));
            dispatch(setLoading(false));
            
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}


export const onEditarHorario=(horario)=>{
    return async(dispatch)=>{
        
        try{
            const horarioModificado=await editarHorario(horario);
           dispatch(actualizarHorario(horarioModificado));
            Swal.fire({
                icon: "success",
                title: 'Horario Modificado exitosamente',
                text: horarioModificado.actividad.nombre,
              });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.message,
              });
        }
    }
}
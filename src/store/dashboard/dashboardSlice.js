import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isLoading:false,
        message:'',
        actividades:[],
        tecnicos:[],
        salas:[],
        horario:[],
        collapsed:false,
        active:null
    },
    reducers: {
        savingNewHorario:(state)=>{
            state.isSaving=true;
        },
        savedNewHorario:(state)=>{
            state.isSaving=false;
        },
        setActividades:(state,action)=>{
            state.actividades=action.payload;
        },
        setTecnicos:(state,action)=>{
            state.tecnicos=action.payload;
        },
        addNewTecnico:(state,action)=>{
            state.tecnicos.push(action.payload);
        },
        onUpdateTecnico:(state,{payload})=>{
            state.tecnicos=state.tecnicos.map(tecnico=>{
                if(tecnico.id===payload.id){
                    return payload;
                }
                return tecnico;
            })
        },
        onDeleteTecnico:(state,action)=>{
            state.tecnicos=state.tecnicos.filter(tecnico=>tecnico.id!==action.payload);
        },
        addNewSala:(state,action)=>{
            state.salas.push(action.payload);
        },
        setSalas:(state,action)=>{
            state.salas=action.payload;
        },
        onUpdateSala:(state,{payload})=>{
            state.salas=state.salas.map(sala=>{
                if(sala.id===payload.id){
                    return payload;
                }
                return sala;
            })
        },onDeleteSala:(state,action)=>{
            state.salas=state.salas.filter(sala=>sala.id!==action.payload);
        },
        addNewActividad:(state,action)=>{
            state.actividades.push(action.payload);
        },
        onUpdateActividad:(state,{payload})=>{
            state.actividades=state.actividades.map(actividad=>{
                if(actividad.id===payload.id){
                    return payload;
                }
                return actividad;
            })
        },
        onDeleteActividad:(state,action)=>{
            state.actividades=state.actividades.filter(sala=>sala.id!==action.payload);
        },
        setCollapsed:(state,action)=>{
            state.collapsed=action.payload;
        },
        onAddDiaHorario:(state,action)=>{
            state.horario=state.horario.concat(action.payload);
        },        
        actualizarHorario:(state,{payload})=>{
            state.horario=state.horario.map(clase=>{
                if(clase.id===payload.id){
                    return {
                        id:payload.id,
                        nombre:payload.actividad.nombre,
                        tecnico:payload.tecnico.nombre,
                        tipoActividad:payload.actividad.tipoActividad.nombre,
                        color:payload.actividad.tipoActividad.color,
                        lugar:payload.sala.nombre,
                        duracion:payload.duracion,
                        nivel:payload.actividad.dificultad,
                        hora:payload.hora,
                        cupo_actual:clase.cupo_actual,
                        cupo_maximo:payload.actividad.max,
                        rango:payload.rango,
                        dia:clase.dia,
                        disponible:true,
                        paga:payload.actividad.paga,
                        idApartados:clase.idApartados
                    };
                }
                return clase;
            })
        },
        onLimpiarHorario:(state)=>{
            state.horario=[];
        },      
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        onLimpiarActive:(state)=>{
            state.active=null
        },
        setActive:(state,action)=>{
            state.active=action.payload;
        }  
    }
});


// Action creators are generated for each case reducer function
export const { 
    setActividades,
    setTecnicos,
    setSalas,
    savingNewHorario,
    savedNewHorario,
    setCollapsed,
    addNewSala,
    onUpdateSala,
    onDeleteSala,
    addNewTecnico,
    onUpdateTecnico,
    onDeleteTecnico,
    addNewActividad,
    onUpdateActividad,
    onDeleteActividad,
    onAddDiaHorario,
    onLimpiarHorario,
    setLoading,
    onLimpiarActive,
    setActive,
    actualizarHorario
 } = dashboardSlice.actions;
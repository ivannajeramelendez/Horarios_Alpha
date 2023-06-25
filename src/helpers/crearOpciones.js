import { SortOptions } from "./ordenarArray";

export const crearActividades =(array=[])=>{
    const options=[];
    array.forEach(item => {
        options.push({value:item.id,label:item.nombre+" - Cupo:"+item.max});
    });
    const s = options.sort(SortOptions);
    return s;   
}

export const crearTecnico =(array=[])=>{
    const options=[];
    array.forEach(item => {
        options.push({value:item.id,label:item.nombre});
    });
    const s = options.sort(SortOptions);
    return s;
}

export const crearSalas =(array=[])=>{
    const options=[];
    array.forEach(item => {
        options.push({value:item.id,label:item.club.nombre+" "+item.nombre});
    });
    const s = options.sort(SortOptions);
    return s;
}

export const opcionesByClub=()=>{
    return [{value:'Club Alpha 2',label:'Club Alpha 2'},{value:'Club Alpha 3',label:'Club Alpha 3'},
                {value:'Sports Plaza',label:'Sports Plaza'},{value:'CIMERA',label:'CIMERA'}]
}
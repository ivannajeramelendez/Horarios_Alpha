
export const getSalasByClub=(name='',lista=[])=>{
    if(name===''){
        return [];
    }
    return lista.filter(elemento=>elemento.club.nombre.includes(name));

}

export const filtrarByDay=(dia='',lista=[])=>{
    return lista.filter(element=>element.dia===dia);
}
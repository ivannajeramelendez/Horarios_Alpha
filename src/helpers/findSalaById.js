export const findSalaById=(id='',array=[])=>{
    return array.find(element=>element.id===id);
}
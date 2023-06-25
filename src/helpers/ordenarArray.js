
export const SortArray=(x, y)=>{
    if (x.nombre < y.nombre) {return -1;}
    if (x.nombre > y.nombre) {return 1;}
    return 0;
}

export const SortOptions=(x, y)=>{
    if (x.label < y.label) {return -1;}
    if (x.label > y.label) {return 1;}
    return 0;
}
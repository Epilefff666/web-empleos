export interface postulaciones_CreacionDTO{
    perfil_postulanteId:number;
    publicacionesId:number;
    fecha_postulacion:Date;
    estadosId:number;
}

export interface postulacionesDTO{
    perfil_postulanteId:number;
    publicacionesId:number;
    fecha_postulacion:Date;
    banActivo:boolean;
    estadosId:number;
}


export interface perfil_postulanteDTO {
    
    
    nombres:string;
    apellidos:string;
    sexo:string;
    numero_documento:string;
    fecha_nacimiento:Date;
    profesion_ocupacion:string;
    descripcion_postulante:string;
    foto_perfil:string;
    cv:string;
    celular:string;
    correo:string;
    habilidad_blanda1:string;
    habilidad_blanda2:string;
    habilidad_blanda3:string;
    habilidad_blanda4:string;
    habilidad_blanda5:string;
    habilidad_tecnica1:string;
    habilidad_tecnica2:string;
    habilidad_tecnica3:string;
    habilidad_tecnica4:string;
    habilidad_tecnica5:string;
    facebook:string;
    instagram:string;
    linkedin:string;
    tiktok:string;
    banActivo:boolean;
    userId:string;
}

export interface perfil_postulante_creacionDTO{
    
    nombres:string;
    apellidos:string;
    sexo:string;
    numero_documento:string;
    fecha_nacimiento:Date;
    profesion_ocupacion:string;
    descripcion_postulante:string;
    foto_perfil:File;
    cv:File;
    celular:string;
    correo:string;
    habilidad_blanda1:string;
    habilidad_blanda2:string;
    habilidad_blanda3:string;
    habilidad_blanda4:string;
    habilidad_blanda5:string;
    habilidad_tecnica1:string;
    habilidad_tecnica2:string;
    habilidad_tecnica3:string;
    habilidad_tecnica4:string;
    habilidad_tecnica5:string;
    facebook:string;
    instagram:string;
    linkedin:string;
    tiktok:string;
    banActivo:boolean;
    userId:string;
}

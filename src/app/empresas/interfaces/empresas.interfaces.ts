export interface perfil_empresaDTO{

    nombre_empresa:string;
    direccion:string;
    celular:string;
    telefono:string;
    descripcion_empresa:string;
    foto_perfil:string;
    correo:string;
    facebook:string;
    instagram:string;
    linkedin:string;
    tiktok:string;
    beneficios:string;
    sector:string;

    banActivo:boolean;
    userId:string;
}

export interface perfil_empresa_creacionDTO{

    nombre_empresa:string;
    direccion:string;
    celular:string;
    telefono:string;
    correo:string;
    descripcion_empresa:string;
    beneficios:string;
    foto_perfil:File;
    sector:string;
    facebook:string;
    instagram:string;
    linkedin:string;
    tiktok:string;
    

    /* banActivo:boolean; */
    userId:string;
}

export interface publicar_empleoDTO{
    puesto_empleo:string;
    descripcion:string;
    requisitos:string;
    fecha_publicacion:Date
    fecha_vencimiento:Date;
    perfil_empresaId:number;
    categoriasId:number;
    estadoId:number;
}

export interface publicar_empleo_creacionDTO{
    puesto_empleo:string;
    descripcion:string;
    requisitos:string;
    fecha_vencimiento:Date;
    perfil_empresaId:number;
    categoriasId:number;
    estadoId:number;
}

export interface postulantes_empresaDTO{
    empresaId: number;

    perfil_postulanteId:number;

    publicacionesId:number;

    fecha_postulacion:Date;
        
    estadosId:number;

    banactivo:boolean;

    puesto_empleo:string;

    fecha_vencimiento:Date;

    nombres:string;

    apellidos:string;

    cv:string;

    foto_perfil:string;

    profesion_ocupacion:string;
}
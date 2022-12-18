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
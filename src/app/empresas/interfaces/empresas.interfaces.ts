export interface perfil_empresaDTO{

    nombre:string;
    direccion:string;
    celular:string;
    telefono:string;
    descripcion:string;
    foto_perfil:string;
    banActivo:boolean;
    userId:string;
}

export interface perfil_empresa_creacionDTO{

    nombre:string;
    direccion:string;
    celular:string;
    telefono:string;
    descripcion:string;
    foto_perfil:File;
    banActivo:boolean;
    userId:string;
}
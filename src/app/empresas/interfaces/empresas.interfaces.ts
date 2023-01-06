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

export interface DetallePostulanteDTO{
    perfil_postulanteId:number;

    publicacionesId:number;

    fecha_postulacion:Date;

    banactivo:boolean;
       
    estadosId:number;

    foto_perfil:string;

    cv:string;

    nombres:string;

    apellidos:string;

    numero_documento:string;

    sexo:string;

    fecha_nacimiento:Date;

    profesion_ocupacion:string;

    descripcion_postulante:string;

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

    celular:string;

    correo  :string;

    facebook:string;

    instagram:string;

    linkedin:string;

    tiktok:string;

    puesto_empleo:string;

    estado:string;


}
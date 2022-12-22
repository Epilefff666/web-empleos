
export interface ofertas_publicadasDTO {
    id : number;
    foto_perfil:string;
    puesto_empleo : string;
    nombre_empresa : string;
    fecha_publicacion : Date;
    estado:string;
    categoria:string;
    empresaId:number;
    categoriaId:number;
    estadoId:number;
}
export interface todas_las_ofertasDTO{
    
    id_empleo_publicado:number;
    puesto_empleo:string; 
    nombre_empresa:string;
    descripcion_empleo:string; 
    salario:number; 
    requisitos_empleo:string; 
    fecha_publicacion: Date; 
    fecha_vencimiento: Date; 
    descripcion_empresa: string; 
    foto_perfil:string;  
    direccion:string; 
    celular:string; 
    telefono:string; 
    nombre_categoria:string; 
    nombre_estado:string; 
    id_perfil_empresa:number; 
    id_usuario:number; 
    correo_empresa:string; 
}
export interface detalle_empleoDTO{
    id_empleo_publicado :number;
    puesto_empleo :string;
    descripcion_empleo :string;
    salario :number;
    requisitos_empleo :string;
    fecha_publicacion :Date;
    fecha_vencimiento :Date;
    id_categoria :number;
    id_estado :number;
    id_perfil_empresa :number;
    nombre_empresa :string;
    direccion :string;
    celular :string;
    telefono :string;
    descripcion_empresa :string;
    foto_perfil :string;
    id_usuario :number;
    correo_electronico :string;
    id_redes_sociales :string;
    facebook :string;
    instagram :string;
    linkedin :string;
    tiktok :string;
}

export interface categoriasDTO{
    id:number;
    nombre:string;
}

export interface credencialesUsuario{
    email:string;
    password:string;
    
}
export interface respuestaAutenticacion{
    token:string;
    expiracion: Date;
}
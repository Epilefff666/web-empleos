import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(){

    return (control:AbstractControl)=>{
        const valor = <string>control.value;
        if(!valor) return;
        if(valor.length === 0) return;

        const primeraLetra = valor[0];
        if(primeraLetra !== primeraLetra.toUpperCase()){
            return{
                primeraLetraMayuscula:{
                    mensaje: 'La primera letra debe ser mayuscula'
                }
            };
        }
        return;
    }
}



export function ValidadorContraseña() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      if (!valor) return;
      if (valor.length === 0) return;
      let regexValidacion = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])/;
  
      console.log(regexValidacion.test(valor));
  
      if (regexValidacion.test(valor)) {
      } else {
        return {
          ValidadorContraseña: {
            mensaje:'Debe existir una mayuscula, un numero y un caracter especial (#,%,&) '
          },
        };
      }
      return;
    };
  }
  export function MustMatch(controlName:string , matchingControlName:string){
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors["MustMatch"]){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true});
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  }

  export function toBase64(file: File) {
    console.log(file);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error); 
    })
}

export function parsearErroresAPI( response: any ): string[] {
    const resultado: string[] =  [];

    if ( response.error ) {
        if ( typeof response.error === 'string' ) {
            resultado.push(response.error);
        } else if (Array.isArray(response.error))
        {
            response.error.forEach((valor: any) => {
                resultado.push(valor.description);
            });
        }else {
            const mapaErrores = response.error.errors;
            const entradas = Object.entries( mapaErrores );
            entradas.forEach( (arreglo: any[] ) => {
                const campo = arreglo[0];
                arreglo[1].forEach( (mensajeError: any) => {
                    resultado.push(`${ campo }: ${ mensajeError }` );
                });
            });
        }
    }


    return resultado;
}

export function formatearFecha( date: Date) {
    date = new Date(date);
    const formato = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}
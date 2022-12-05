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
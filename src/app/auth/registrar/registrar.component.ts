import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']

})
export class RegistrarComponent {

    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public registerForm : FormGroup = this.fb.group({
       nombre  : ['', Validators.required],
       email : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
       password : ['', Validators.required],
       confirmPassword : ['', Validators.required],
       check : [false, Validators.requiredTrue]
    },{
      validators : this.passwordIguales('password','confirmPassword')
    })
    constructor(
      private fb : FormBuilder,
      private router : Router,
      private authService : AuthService
    ){}


    constraseniasValidas(){
      const pass1 = this.registerForm.get('password')?.value
      const pass2 = this.registerForm.get('confirmPassword')?.value
      if( pass1 ===  pass2){
        return false;
      }else{
        return true;
      }
    }

    validTerminos(){
        if(this.registerForm.get('check')?.invalid && this.registerForm.touched){
          return true;
        }else{
          return false;
        }
    }



    passwordIguales(pass1 : string, pass2 : string){
        return(formGroup : FormGroup) => {
          const pass1Control = formGroup.get(pass1);
          const pass2Control = formGroup.get(pass2);

          if(pass1Control?.value === pass2Control?.value){
            pass2Control?.setErrors(null)
          }else{
            pass2Control?.setErrors({noEsIgual : true})
          }
        }
    }

    campoValido(campo : string){
      if(this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched){
        return true
      }else{
        return false
      }
    }


    enviarRegistro(){
      if(this.registerForm.invalid){
        this.registerForm.markAllAsTouched();
        return;
      }

      const {confirmPassword, check, ...data} = this.registerForm.value;

      this.authService.registrarUsuario(data)
                                    .subscribe(
                                      {
                                        next : resp =>  {
                                          this.router.navigateByUrl('/')
                                        },
                                        error : (err : HttpErrorResponse) => {
                                          Swal.fire({
                                            icon: 'error',
                                            title: 'Ha ocurrido un error inesperado',
                                            text: err.error.msg,

                                          })
                                        }
                                      }
                                    )


    }
}

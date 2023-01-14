import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loginForm : FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '' ,[Validators.required, Validators.pattern(this.emailPattern)]],
    password : ['',Validators.required],
    remember : ['']
  })

  constructor(
    private fb: FormBuilder,
    private router :Router,
    private authService : AuthService
  ){}


  campoValido(campo : string){
     if( this.loginForm.get(campo)?.invalid && this.loginForm.touched){
          return true;
     }else{
        return false
     }
  }
  login(){
      if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        return;
      }

      const {remember , ...data} = this.loginForm.value
      this.authService.loginUsuario(data)
                .subscribe(
                  {
                    next :resp => {
                      if(remember){
                        localStorage.setItem('email',this.loginForm.get('email')?.value)
                      }else{
                        localStorage.removeItem('email')
                      }
                      this.router.navigateByUrl('/')

                    },
                    error : (err :HttpErrorResponse) => {

                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.error.msg

                      })
                    }
                  }
                )
  }
}

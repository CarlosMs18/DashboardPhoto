import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { FileUploadsService } from '../../../services/file-uploads.service';

import { userResponseI } from '../../../interfaces/registerResponse.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
    public usuario !: userResponseI;
    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public perfilForm!: FormGroup;
    public imagenSubir!: File

    constructor(
      private router : Router,
      private fb : FormBuilder,
      private authService : AuthService,
      private fileUploadService : FileUploadsService
    ){
      this.usuario = this.authService.usuario;
    }
  ngOnInit() {
    this.perfilForm = this.fb.group({
      nombre : [this.usuario.nombre,Validators.required],
      email : [this.usuario.email,[Validators.required ,Validators.pattern(this.emailPattern)]]
    })

  }

    campoValido(campo : string){
     if(this.perfilForm.get(campo)?.invalid && this.perfilForm.get(campo)?.touched){
      return true;
     }else{
      return false;
     }
    }

    cambiarImagen(file : File){
       this.imagenSubir =  file
    }


    subirImagen(){
      this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios',this.usuario.uid)
          .then(resp => console.log(resp))
          .catch(err => console.log(err))
    }

    enviarPerfil(){
      if(this.perfilForm.invalid){
        return;
      }

      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.actualizarPerfil(this.perfilForm.value)
                  .subscribe(
                    {
                      next : resp => {

                      const {nombre , email} = this.perfilForm.value
                      this.usuario.nombre = nombre;
                      this.usuario.email = email;
                      this.router.navigateByUrl('/')
                        Swal.fire('Guardado', '', 'success')
                      },
                      error : (err : HttpErrorResponse) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: err.error.msg

                        })
                      }
                    }
                  )
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })


    }


}

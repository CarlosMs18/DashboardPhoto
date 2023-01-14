import Swal from 'sweetalert2';
import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { userResponseI } from '../../../interfaces/registerResponse.interface';
import { usuarioGetI } from '../../../interfaces/usuarioGet.interface';

import { BuscadorService } from '../../../services/buscador.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public usuariosGet : usuarioGetI[] = [];
  public usuariosTemp : usuarioGetI[] = [];
  public totalUsuarios : number = 0;
  public cargando : boolean = true;
  public desde : number = 0;


  constructor(
    private authService : AuthService,
    private buscadorService : BuscadorService
  ){



  }
  ngOnInit(){
    this.getUsuarios();
  }

  buscarTermino(valor : string){
    if(valor.length === 0){
      return (this.usuariosGet = this.usuariosTemp);
    }
    this.buscadorService.buscar(valor, 'usuarios')
          .subscribe({
            next : ({ok, resultados})=> {

                this.usuariosGet =resultados

            }
          })
  }


  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde <=0){
      this.desde = 0
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }


    this.getUsuarios();
  }


  getUsuarios(){
    this.authService.getUsuarios(this.desde)
          .subscribe(
            {
              next : ({total, usuarios})=>{
                console.log(usuarios);
                this.cargando = false;
                this.usuariosGet = usuarios;
                this.usuariosTemp = usuarios;
                this.totalUsuarios = total;
              }
            }
          )
  }

  cambiarRole(usuario : usuarioGetI){
    this.authService.cambiarRole(usuario)
                    .subscribe(
                      {
                        next : resp => resp
                      }
                    )
  }

  eliminarUsuario(usuario : usuarioGetI){
    if(this.authService.getId === usuario.uid){
      return Swal.fire('Error','No se puede eliminar a ud mismo mientras esta en sesion!')
    }


    Swal.fire({
      title: 'Esta usted seguro?',
      text: "Es un acto irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUsuarios(usuario.uid)
        .subscribe(
          {
            next : (resp : any )=> {
              this.getUsuarios();
              Swal.fire(
                resp.msg,
                `El usuario ${usuario.nombre} ha sido eliminado satisfactoriamente`,
                'success'
              )
            }
          }
        )

      }
    })

  }

}

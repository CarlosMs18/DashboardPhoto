import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError, of, delay, debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerI } from '../interfaces/registerForm.interface';
import { userResponseI } from '../interfaces/registerResponse.interface';
import { usuarioGetI } from '../interfaces/usuarioGet.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url : string = environment.base_url;
  public usuario!: userResponseI;
  constructor(
    private http : HttpClient,
    private router :Router
  ) { }

  get getHeaders(){
    return {
      headers :{
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }

  get getId(){
    return this.usuario.uid;
  }

  private guardarLocalStorage(token : string){
      localStorage.setItem('token',token);
  }

  registrarUsuario(data : registerI){
    return this.http.post<{ok : boolean, token : string, registro : userResponseI}>
                      (`${this.base_url}/usuarios`,data)
                      .pipe(
                        tap((resp) =>this.guardarLocalStorage(resp.token))
                      )
  }


  loginUsuario(data : {email : string, password : string}){
      return this.http.post<{ok : boolean , token: string}>
                (`${this.base_url}/login`,data)
                        .pipe(
                          tap((resp) =>this.guardarLocalStorage(resp.token))
                        )
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }


  renewToken(){
    return this.http.get<{ok : boolean, token : string, usuario : userResponseI}>
              (`${this.base_url}/login/renew`, this.getHeaders).pipe(
      tap((resp ) =>{
        this.guardarLocalStorage(resp.token)
      }
      ),
      map((resp) => {
        this.usuario = resp.usuario;
        return true
      }),
      catchError(err => of(false))
    )

  }


  /* ADMINISTRAR USUARIOS */


  getUsuarios(desde :number){
    return this.http.get<{ok : boolean, total : number, usuarios:usuarioGetI[]}>
          (`${this.base_url}/usuarios?desde=${desde}` , this.getHeaders)
            .pipe(
               map(resp => {
                return {
                  total :resp.total,
                  usuarios : resp.usuarios
                }
               })
            )
  }

  cambiarRole(usuario : usuarioGetI){
      return this.http.put(`${this.base_url}/usuarios/${usuario.uid}`,usuario,this.getHeaders)

  }


  deleteUsuarios(usuarioId : string){
      return this.http.delete(`${this.base_url}/usuarios/${usuarioId}`,this.getHeaders)
  }


  actualizarPerfil(usuario : {nombre : string, email : string}){
    return this.http.put(`${this.base_url}/usuarios/${this.getId}`,usuario,this.getHeaders)

  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { usuarioGetI } from '../interfaces/usuarioGet.interface';
import { hospitalGetI } from '../interfaces/hospitalResponse.interface';
import { medicoInterface } from '../interfaces/medicoResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  public base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }
  get getHeaders(){
    return {
      headers :{
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }
  buscar(termino : string, tipo : 'usuarios' | 'hospitales' | 'medicos'){
      return this.http.get<{ok : boolean, resultados : usuarioGetI[] | hospitalGetI[] | medicoInterface[]}>
          (`${this.base_url}/todo/coleccion/${tipo}/${termino}`,this.getHeaders)



  }
}

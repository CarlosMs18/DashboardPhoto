import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { medicoInterface } from '../interfaces/medicoResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private base_url = environment.base_url
  constructor(private http :HttpClient) { }

  get getHeaders(){
    return {
      headers :{
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }
  getMedicos(){
    return this.http.get<{medicos : medicoInterface[]}>(`${this.base_url}/medicos`,this.getHeaders)
  }


  getMedicoId(medicoId : string){
    return  this.http.get<{ok : boolean , medico : medicoInterface}>(`${this.base_url}/medicos/${medicoId}`,this.getHeaders)
  }

  postMedico(medico : {nombre : string, hospital : string}){
    return  this.http.post(`${this.base_url}/medicos`,medico ,this.getHeaders)
  }


  updateMedico(medico : any){
    return  this.http.put(`${this.base_url}/medicos/${medico._id}`,medico ,this.getHeaders)
  }

  deleteMedicos(medicoId : string){
    return this.http.delete(`${this.base_url}/medicos/${medicoId}`,this.getHeaders)
  }
}

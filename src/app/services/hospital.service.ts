import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { hospitalGetI } from '../interfaces/hospitalResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private base_url = environment.base_url;
  constructor(
    private http : HttpClient
  ) { }
  get getHeaders(){
    return {
      headers :{
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }
  getHospitales(){
    return this.http.get<{ok : boolean, hospitales : hospitalGetI[]}>(`${this.base_url}/hospitales`)
  }


  editarHospital(hospital : hospitalGetI){
    return this.http.put(`${this.base_url}/hospitales/${hospital._id}`,hospital , this.getHeaders);
  }

  postHospital(nombre : string){
    return this.http.post<{ok:boolean , hospitalDB : hospitalGetI}>(`${this.base_url}/hospitales`, {nombre} , this.getHeaders)
  }

  deleteHospital(hospitalId : string){

    return this.http.delete(`${this.base_url}/hospitales/${hospitalId}`,this.getHeaders)
  }
}

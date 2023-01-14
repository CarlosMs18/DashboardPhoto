import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadsService {
  public base_url : string = environment.base_url;
  constructor() { }

  async actualizarFoto( archivo: File,
    tipo : 'usuarios' | 'medicos' | 'hospitales',
    id : string
    ){

    try {
      const  url = `${this.base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch(url, {
        method : 'PUT',
        headers : {
          'x-token' : localStorage.getItem('token') || ''
        },
        body : formData
      })

      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error)
      return false;
    }
  }
}

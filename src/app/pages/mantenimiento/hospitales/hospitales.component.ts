import Swal from 'sweetalert2';
import { Component , OnInit} from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { hospitalGetI } from '../../../interfaces/hospitalResponse.interface';
import { BuscadorService } from '../../../services/buscador.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales : hospitalGetI[] = [];
  public hospitalTemp : hospitalGetI[] = [];
  public cargando : boolean = true;
  constructor(
    private hospitalService :HospitalService,
    private buscadorService : BuscadorService
  ){}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.hospitalService.getHospitales().subscribe(
      {

        next : resp => {
          console.log(resp)
          this.cargando = false;
          this.hospitales = resp.hospitales
          this.hospitalTemp = resp.hospitales

        }
      }
     )
  }

  editarHospital(hospital : hospitalGetI){
      this.hospitalService.editarHospital(hospital)
      .subscribe(
        {
            next :resp => {
              Swal.fire('Actualizado', hospital.nombre ,'success');
            },
            error : (err : HttpErrorResponse) => {
              console.log(err)
              console.log()
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.errors.nombre.msg,

              })
            }
        }
      )
  }
  buscarHospital(valor : string){
    if(valor.length === 0){
      return this.hospitales = this.hospitalTemp;
    }
     this.buscadorService.buscar(valor ,'hospitales')
            .subscribe(resp => {
              this.hospitales = resp.resultados as hospitalGetI[];
            })
  }

  async crearHospital(){
     const {value = ''} = await Swal.fire<string>({
        title: 'Creacion de Hospital',
        input: 'text',
        inputLabel: 'Digite el nombre del hospital',

        showCancelButton: true,

      })

      if(value.trim().length > 3){
          this.hospitalService.postHospital(value)
            .subscribe(
              {
                next : ({ok,hospitalDB}) => this.hospitales.push(hospitalDB)
              }
            )

      }



  }

  eliminarHospital(hospital : hospitalGetI){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe(
            {
              next: resp => {
                this.cargarHospitales();
                Swal.fire(
                  'Deleted!',
                  `El hospital ${hospital.nombre}  ha sido eliminaod con exito!`,
                  'success'
                )
              }
            }
          )

      }
    })

  }
}

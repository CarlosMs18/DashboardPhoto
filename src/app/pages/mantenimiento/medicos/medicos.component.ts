import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { medicoInterface } from '../../../interfaces/medicoResponse.interface';
import Swal from 'sweetalert2';
import { BuscadorService } from '../../../services/buscador.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
    public medicos : medicoInterface[] = [];
    public cargando : boolean = true;
    constructor(
      private medicosService :MedicosService,
      private buscadorService :BuscadorService
    ){}

    ngOnInit(): void {
      this.obtenerMedicos();
  }


  obtenerMedicos(){
    this.medicosService.getMedicos()
          .subscribe(
            {
              next : ({medicos}) =>{

                this.cargando = false;
                this.medicos = medicos
              }
            }
          )
  }



  buscarMedico(value : string){
    this.buscadorService.buscar(value, 'medicos')
          .subscribe({
            next : ({ok ,resultados}) => this.medicos = resultados as medicoInterface[]
          })
  }





  eliminarMedicos(medico :medicoInterface){
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
        this.medicosService.deleteMedicos(medico._id)
        .subscribe(
          {
            next : resp => {
              this.obtenerMedicos();
              Swal.fire(
                'Deleted!',
                'Ha sido eliminado con exito',
                'success'
              )

            }
          }
        )

      }
    })

  }
}

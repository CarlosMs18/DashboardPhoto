import Swal from 'sweetalert2';
import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from '../../../services/medicos.service';
import { medicoInterface } from '../../../interfaces/medicoResponse.interface';
import { HospitalService } from '../../../services/hospital.service';
import { hospitalGetI } from 'src/app/interfaces/hospitalResponse.interface';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit{

  public medicoForm !: FormGroup ;
  public medico !: medicoInterface;
  public hospitales! : hospitalGetI[];
  public hospitalSeleccionado! : hospitalGetI
  public medicoSeleccionado! : medicoInterface

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private activatedRoute :ActivatedRoute,
    private medicosService: MedicosService,
    private hospitalService : HospitalService
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
        this.cargarMedico(id)
    })

    this.medicoForm= this.fb.group({
      nombre : ['',Validators.required],
      hospital : ['',Validators.required]
    })


    this.cargarHospitales();


    this.medicoForm.get('hospital')?.valueChanges
          .subscribe(hospitalId => {
            this.hospitalSeleccionado = this.hospitales.find(h => h._id  === hospitalId)!;
            console.log(this.hospitalSeleccionado)
          })

  /*   this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      )!;
      console.log(this.hospitalSeleccionado);
    }); */
  }




  cargarMedico(id : string){
    if(id === 'nuevo'){
      return;
    }

    this.medicosService.getMedicoId(id)
    .subscribe(
      {
        next : ({medico}) => {

          this.medico = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({
            nombre: medico.nombre,
            hospital: medico.hospital._id,
          });
        },
        error : err => console.log(err)
      }
    )
  }


  cargarHospitales(){
    this.hospitalService.getHospitales()
          .subscribe(
            {
              next : ({hospitales}) => this.hospitales = hospitales
            }
          )
  }

  guardarCambios(){
    const {nombre} = this.medicoForm.value;
    if(this.medicoSeleccionado){



        const data = {
          ...this.medicoForm.value,
          _id : this.medicoSeleccionado._id
        }
        this.medicosService.updateMedico(data)
        .subscribe(
          {
            next : resp => {

              Swal.fire(' Medico actualizado correcamente',nombre, 'success')
              this.router.navigateByUrl('/dashboard/medicos')
            }
          }
        )


    }else{
      console.log('2')
      this.medicosService.postMedico(this.medicoForm.value)
      .subscribe(
        {
          next : resp => {
            Swal.fire('Medico creado correctamente',nombre, 'success')
            this.router.navigateByUrl('/dashboard/medicos')

          }
        }
      )
    }

  }

}

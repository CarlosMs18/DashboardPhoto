import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AumentadorComponent } from './aumentador/aumentador.component';
import { FormsModule } from '@angular/forms';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ImagenModule } from '../pipes/imagen.module';



@NgModule({
  declarations: [
    AumentadorComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImagenModule
  ],
  exports : [
    AumentadorComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AumentadorComponent } from './aumentador/aumentador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AumentadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    AumentadorComponent
  ]
})
export class ComponentsModule { }

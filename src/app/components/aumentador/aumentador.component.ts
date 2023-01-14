import { Component, Input, Output, OnInit , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aumentador',
  templateUrl: './aumentador.component.html',
  styles: [
  ]
})
export class AumentadorComponent implements OnInit {
   @Input('btnClass') btnClass :string = 'btn-primary'
   @Input('progreso') progreso : number = 0;
   @Output('valorSalida') valorSalida : EventEmitter<number> = new EventEmitter();
  constructor(){}

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
    console.log(this.btnClass)


  }


  cambiarValor(valor : number){

      if(this.progreso >=100 && valor > 0 ){
        return this.valorSalida.emit(100);
      }else if(this.progreso <=0 && valor < 0){
        return this.valorSalida.emit(0)
      }else{
        this.progreso = this.progreso + valor;

        return this.valorSalida.emit(this.progreso)
      }


  }

  inputValor(valor : number){
    if(valor >=100){
       this.progreso = 100
    }else if(valor <= 0){
      this.progreso = 0
    }else{
      this.progreso = valor
    }

    this.valorSalida.emit(this.progreso)
  }
}

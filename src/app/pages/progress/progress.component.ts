import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent {
     public width1 : number = 45;
     public width2 : number = 23;

     constructor(){}

     get getWidth1(){
        return `${this.width1}%`;
     }

     get getWidth2(){
      return `${this.width2}%`;
   }


}

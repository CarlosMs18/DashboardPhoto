import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public idIndex = document.querySelector('#theme');
  constructor() {}

  changeColorService(color : string){
    const idIndex = `./assets/css/colors/${color}.css`;
    this.idIndex?.setAttribute('href',idIndex);
    localStorage.setItem('color',idIndex)
    this.currentColor()
  }

  currentColor(){
    const coloresArray = document.querySelectorAll('.selector')
    coloresArray.forEach((color) => {
      color.classList.remove('working')

      const colorActual = this.idIndex?.getAttribute('href');
      const colorIterado = color.getAttribute('data-theme');
      const pathComparacion = `./assets/css/colors/${colorIterado}.css`;

      if(colorActual === pathComparacion){
        color.classList.add('working')
      }
    })
  }

  iniciarColor(){
    const colorLocalStorage = localStorage.getItem('color') || './assets/css/colors/default-dark.css';
    this.idIndex?.setAttribute('href',colorLocalStorage);
    this.currentColor()
  }
}

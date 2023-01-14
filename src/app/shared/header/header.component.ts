import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { userResponseI } from '../../interfaces/registerResponse.interface';
import { usuarioGetI } from '../../interfaces/usuarioGet.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{
  public usuario!: usuarioGetI;

  constructor(

    private authService : AuthService
  ){}
  ngOnInit() {

    this.usuario = this.authService.usuario;
  }
  logout(){
    this.authService.logout();
  }
}

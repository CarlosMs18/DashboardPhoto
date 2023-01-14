import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { usuarioGetI } from '../../interfaces/usuarioGet.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public usuario !: usuarioGetI;
  sideBarMenu : any;
  constructor(
    private sidebarService: SidebarService,
    private authService : AuthService
  ){
    this.sideBarMenu = sidebarService.sideBarMenu;


  }
  ngOnInit(){
    this.usuario = this.authService.usuario;
  }
}

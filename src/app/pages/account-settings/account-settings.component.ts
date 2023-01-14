import { Component ,OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent  {


  constructor(private accountService : AccountService){}




  cambiarColor(color : string){
    this.accountService.changeColorService(color)

  }



}

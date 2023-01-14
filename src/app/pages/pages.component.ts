import { Component , OnInit} from '@angular/core';
import { AccountService } from '../services/account.service';
declare function customInitFunctions():void
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',

})
export class PagesComponent implements OnInit  {


  constructor( private accountService : AccountService){
    this.accountService.iniciarColor();
  }

  ngOnInit(): void {
    customInitFunctions();
  }


}

import { Component , OnDestroy} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import {Subscription ,map , filter} from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: [
  ]
})
export class BreadcumbsComponent implements OnDestroy  {
    public titleSubs$ : Subscription;
    public titleP: string = '';
    constructor(private router :Router){
      this.titleSubs$ =  this.getArgumentoRutas()
                                    .subscribe(({title}) => {

                                        this.titleP = title
                                        document.title = `Administrador - ${title}`
                                    })

    }

  ngOnDestroy(): void {
     this.titleSubs$.unsubscribe();
  }

    getArgumentoRutas(){
      return this.router.events
      .pipe(
       filter((event: any)=>event instanceof ActivationEnd),
       filter((event : ActivationEnd) => event.snapshot.firstChild === null),
       map((event : ActivationEnd)  => event.snapshot.data)
     )

    }
}

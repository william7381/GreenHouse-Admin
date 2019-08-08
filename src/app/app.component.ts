import { MatPaginatorIntl } from '@angular/material';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyRoutes } from './MyRoutes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GreenHouse-Admin';
  itemsPerPageLabel = ' Tabla';

  constructor(router: Router) {
    router.navigateByUrl(MyRoutes.menuAdmin + '/' + MyRoutes.cities);
  }
}

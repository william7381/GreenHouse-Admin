import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Route, Router, RouterModule, Routes} from '@angular/router';
import {MyRoutes} from './MyRoutes';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import {HttpClientService} from './ServiceHttpClient/http-client.service';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoicedComponent } from './invoiced/invoiced.component';
import { NewProviderComponent } from './new-provider/new-provider.component';
import { DailyProviderComponent } from './daily-provider/daily-provider.component';
import {FormsModule} from '@angular/forms';
import {InventoryComponent} from './inventory/inventory.component';
import {AllMaterialModules} from './all-material-modules.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TypesDocumentComponent} from './types-document/types-document.component';
import {TypesPlateComponent} from './types-plate/types-plate.component';
import {CitiesComponent} from './cities/cities.component';
import {VerifyLoginGuard} from './verifyLogin/verify-login.guard';

const myRouters: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: MyRoutes.login},
  {path: MyRoutes.login, component: LoginComponent},
  {path: MyRoutes.menuAdmin, component: MainComponent, //canActivate: [VerifyLoginGuard],
    children: [
      {path: MyRoutes.menu, component: MenuComponent},
      {path: MyRoutes.newInvoice, component: NewInvoiceComponent},
      {path: MyRoutes.invoiced, component: InvoicedComponent},
      {path: MyRoutes.inventory, component: InventoryComponent},
      {path: MyRoutes.newProvider, component: NewProviderComponent},
      {path: MyRoutes.dailyProvider, component: DailyProviderComponent},
      {path: MyRoutes.typesDocument, component: TypesDocumentComponent},
      {path: MyRoutes.typesPlate, component: TypesPlateComponent},
      {path: MyRoutes.cities, component: CitiesComponent},
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: MyRoutes.login}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    MenuComponent,
    NewInvoiceComponent,
    InventoryComponent,
    InvoicedComponent,
    NewProviderComponent,
    DailyProviderComponent,
    TypesDocumentComponent,
    TypesPlateComponent,
    CitiesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(myRouters, {useHash: true}),
    FormsModule,
    AllMaterialModules
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

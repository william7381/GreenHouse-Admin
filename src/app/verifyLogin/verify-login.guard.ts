import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import {MyRoutes} from '../MyRoutes';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginGuard implements CanActivate {

  constructor(private router: Router, private service: HttpClientService) { }

  canActivate(): boolean {
    if (!this.service.userInto) {
      this.navigate(MyRoutes.login);
      return false;
    }
    return true;
  }

  private navigate(router: string) {
    this.router.navigateByUrl(router);
  }
}

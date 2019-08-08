import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import {Router} from '@angular/router';
import {MyRoutes} from '../MyRoutes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(private myHttp: HttpClientService, private router: Router) { }

  ngOnInit() {
  }

  validateUser(user: HTMLInputElement, pass: HTMLInputElement) {
    if (!user.value || !pass.value) {
      alert('Por favor, complete los campos');
      return;
    }
    this.loading = true;
    this.myHttp.get('/login/admin/' + user.value + '/' + pass.value).subscribe(
      res => {
        // @ts-ignore
        if (res.value) {
          this.router.navigateByUrl(MyRoutes.menuAdmin);
          this.myHttp.userInto = true;
        } else {
          user.value = pass.value = '';
          alert('Usuario o contraseña incorrectos');
        }
        this.loading = true;
      }
    );
  }

  clearForm(user: HTMLInputElement, pass: HTMLInputElement) {
    user.value = pass.value = '';
  }
}

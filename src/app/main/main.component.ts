import { Component, OnInit } from '@angular/core';
import {MyRoutes} from '../MyRoutes';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';

@Component({
  selector: 'app-menu',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  myRoutes = MyRoutes;

  constructor(private service: HttpClientService) { }

  ngOnInit() {
  }

}

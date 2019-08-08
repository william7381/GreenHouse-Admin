import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private userInto1 = false;

  constructor(private httpClient: HttpClient) { }

  public get(url: string) {
    return this.httpClient.get(url);
  }

  public post(url: string, body: any) {
    return this.httpClient.post(url, body);
  }

  delete(url: string) {
    return this.httpClient.delete(url, {responseType: 'text'});
  }

  put(url: string, body: any) {
    return this.httpClient.put(url, body);
  }

  get userInto(): boolean {
    return this.userInto1;
  }

  set userInto(value: boolean) {
    this.userInto1 = value;
  }
}

import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";

const URL_API_REST='http://localhost:8081/rest/';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  deployement(file: File): void {
    console.log("service angular");
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(URL_API_REST + 'upload', formData, options)               // http post method to sending data
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log('success'),
        error => console.log(error)
      )
  }
}

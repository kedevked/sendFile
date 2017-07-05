import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";

const URL_API_REST='http://localhost:8080/rest/';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  deployement(file: File): void {
    console.log("service angular");
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/*')
    //headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(URL_API_REST + 'upload', formData, headers)               // http post method to sending data
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log('success'),
        error => console.log(error)
      )
  }
  downloadfile(filePath: string){
    return this.http
      .get( URL_API_REST + 'download?filePath='+ filePath, {responseType: ResponseContentType.ArrayBuffer})
      .map(res =>  res)
  }
}

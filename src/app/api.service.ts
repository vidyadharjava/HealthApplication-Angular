import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollee } from './enrollee.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getEnrolleeList() : Observable<Enrollee>{
    return this.httpClient.get(`http://localhost:8080/enrollees`).pipe(
    map((res: any) => {
     return res;
    }));
  }

  public updateEnrollee(enrollee : Enrollee) : Observable<Enrollee>{
    
      return this.httpClient.post<Enrollee>('http://localhost:8080/enrollees', enrollee)
      .pipe(
        map((res: any) => {
         return res;
        }));
  }
}

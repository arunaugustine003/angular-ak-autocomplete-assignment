import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) {}


  getData(): Observable<any> {
    const url = "http://localhost:3000/records/";
    return this.http.get<any>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private api = "http://localhost:5257/api/results";

  constructor(private http: HttpClient) { }

  getResult(key: number): Observable<number> {
    return this.http.get<number>(`${this.api}/${key}`);
  }
}

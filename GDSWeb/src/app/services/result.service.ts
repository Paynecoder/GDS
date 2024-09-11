import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResultEntry {
  key: number;
  result: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private api = "http://localhost:5257/api/results/";

  constructor(private http: HttpClient) { }

  getResult(key: number): Observable<number> {
    return this.http.get<number>(`${this.api}${key}`);
  }

  submitResult(result: number): Observable<ResultEntry> {
    return this.http.post<ResultEntry>(this.api, { result })
  }
}

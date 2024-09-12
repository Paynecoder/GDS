// Author: Joshua Payne
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface representing the result entry from dotnet api.
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

  // Fetches a result entry by its key from the dotnet api.
  getResult(key: number): Observable<number> {
    return this.http.get<number>(`${this.api}${key}`);
  }

  // Submits a result entry to the api.
  submitResult(result: number): Observable<ResultEntry> {
    return this.http.post<ResultEntry>(this.api, { result })
  }
}

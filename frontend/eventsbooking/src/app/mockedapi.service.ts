import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MockedapiService {
  
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllEventsDetails() {
    return this.http.get(this.apiUrl);
  }

  getOneEventsDetails(id) {
    return this.http.get(this.apiUrl+'/'+id);
  }
}

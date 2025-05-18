import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostPropertyService {

  private postPropertyURL = 'http://localhost:8080/api/user/post/property';


  constructor(private http: HttpClient) { }

  postProperty(
    data: {
      userID: number; 
      title: string; 
      category: string;
      description: string;
      address: string;
      contactPerson: string;
      contactNumber: string;
      area: string;
      availableFrom: Date;
      rentAmount: number;
      division: string;
      district: string;
      thana: string;
      section: string;
      roadNumber: string;
      houseNumber: string;
    }): Observable<any>{
    return this.http.post<any>(this.postPropertyURL, data);
  }
}

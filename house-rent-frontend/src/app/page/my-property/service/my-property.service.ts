import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPostedProperty, UpdateMyPostedProperty } from '../../../model/class';

@Injectable({
  providedIn: 'root',
})
export class MyPropertyService {

  private getMypropertyURL = 'http://localhost:8080/api/user/property/posted/me';
  private deleteMyPropertyURL = 'http://localhost:8080/api/user/property/posted/delete';
  private updateMyPropertyURL = 'http://localhost:8080/api/user/property/posted/update';


  constructor(private http: HttpClient) {}

  getMyPostedProperty(): Observable<MyPostedProperty[]> {
    const id = localStorage.getItem('id');
    if (!id) {
      throw new Error('User ID is missing in localStorage.');
    }
    const params = new HttpParams().set('id', id);
    return this.http.get<MyPostedProperty[]>(this.getMypropertyURL, { params });
  }

  deleteMyPostedProperty(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<any>(this.deleteMyPropertyURL, { params });
  }

  updateMyPostedProperty(data: UpdateMyPostedProperty): Observable<any> {
    return this.http.put<any>(this.updateMyPropertyURL, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetPostedProperty } from '../../model/class';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private getPostedPropertyURL = 'http://localhost:8080/api/user/all/posted/property';
  private postUnlockPropertyURl = 'http://localhost:8080/api/user/property/unlock';

  constructor(private http: HttpClient) {}

  getPostedProperty(): Observable<GetPostedProperty[]> {
    return this.http.get<GetPostedProperty[]>(this.getPostedPropertyURL);
  }

  unlockProperty(userId: number, propertyPostId: number): Observable<any>{
    const payload = { userId, propertyPostId };
    return this.http.post(this.postUnlockPropertyURl, payload);
  }
}
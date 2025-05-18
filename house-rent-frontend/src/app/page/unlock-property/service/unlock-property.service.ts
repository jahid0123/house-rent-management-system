import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnlockedPost } from '../../../model/class';

@Injectable({
  providedIn: 'root'
})
export class UnlockPropertyService {

  private myUnlockPropertyUrl = 'http://localhost:8080/api/user/property/unlock/me';

  constructor(private http: HttpClient) { }

  getMyUnlockProperty(): Observable<any>{
    
   const id = localStorage.getItem('id');
    if (!id) {
      throw new Error('User ID is missing in localStorage.');
    }
    const params = new HttpParams().set('id', id);
    return this.http.get<UnlockedPost[]>(this.myUnlockPropertyUrl, { params });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserInfo } from '../../../model/class';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private getUserURL = 'http://localhost:8080/api/user/info';
  

  constructor(private http: HttpClient) { }


 getUserInfo(): Observable<GetUserInfo> {
  const userId = localStorage.getItem('id');
  const safeUserId = userId ?? ''; // fallback to empty string if null
  const params = new HttpParams().set('userId', safeUserId);

  return this.http.get<GetUserInfo>('http://localhost:8080/api/user/info', { params });
}

changePassword(data: { userId: number; currentPassword: string; newPassword: string }){
  return this.http.put('http://localhost:8080/api/user/change-password', data);
}


editUserInfo(data: { userId: number; name: string; phone: string }) {
  return this.http.put('http://localhost:8080/api/user/edit', data, {
    responseType: 'text' as 'json'
  });
}




//   getUserInfo(body: { userId: number }): Observable<any> {
//   return this.http.get<any>(this.getUserURL, body);
// }

  // getUserInfo(body: {userId: number}): Observable<any>{
  //   return this.http.get<any>(this.getUserURL, body);
  // }
}

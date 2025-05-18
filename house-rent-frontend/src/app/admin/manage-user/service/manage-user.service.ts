import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageUserService {
  private allUserUrl = 'http://localhost:8080/api/admin/alluser';
  private deleteUserUrl = 'http://localhost:8080/api/admin/delete/user';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.allUserUrl);
  }

  deleteUser(id: number) {
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.deleteUserUrl, { params });
  }

  // const userId = localStorage.getItem('id');
  // const safeUserId = userId ?? ''; // fallback to empty string if null
  //const params = new HttpParams().set('userId', safeUserId);

  //return this.http.get<GetUserInfo>('http://localhost:8080/api/user/info', { params });
}

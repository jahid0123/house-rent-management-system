import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentPost } from '../../../model/class';

@Injectable({
  providedIn: 'root'
})
export class ManagePostService {


  private getAllPostUrl = 'http://localhost:8080/api/admin/all/posted/property';
  private editPostUrl = 'http://localhost:8080/api/admin/update/posted/property';

  constructor(private http: HttpClient) { }


  getAllPost(): Observable<RentPost[]>{
    return this.http.get<RentPost[]>(this.getAllPostUrl);
  }

  editPost(data: {postId: number; isAvailable: boolean}): Observable<any>{
    return this.http.put<any>(this.editPostUrl, data);
  }
}

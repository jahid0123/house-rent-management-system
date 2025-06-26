import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCreditPackage } from '../../../model/class';

@Injectable({
  providedIn: 'root',
})
export class ManagePackagesService {
  private addPackageUrl = 'http://localhost:8080/api/admin/add/package';
  private editPackageUrl = 'http://localhost:8080/api/admin/edit/package';
  private deletePackageUrl = 'http://localhost:8080/api/admin/delete/package';

  constructor(private http: HttpClient) {}

  addPackage(data: AddCreditPackage): Observable<any> {
    return this.http.post<any>(this.addPackageUrl, data);
  }

  editPackage(data: AddCreditPackage): Observable<any> {
    return this.http.put<any>(this.editPackageUrl, data);
  }

  deletePackage(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(this.deletePackageUrl, { params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetAllCreditPackage } from '../../../model/class';

@Injectable({
  providedIn: 'root'
})
export class BuyPackageService {

  private getPackageURL = 'http://localhost:8080/api/user/all/credit/package';
  private buyPackageUrl = 'http://localhost:8080/api/user/buy/package'

  constructor(private http: HttpClient, private router: Router) { }

  getAllPackages(): Observable<GetAllCreditPackage[]>{
    return this.http.get<GetAllCreditPackage[]>(this.getPackageURL);
  }

  buyPackage(data: {userId: number; creditPackageId: number}): Observable<any>{
    return this.http.post<any>(this.buyPackageUrl, data);
  }
}

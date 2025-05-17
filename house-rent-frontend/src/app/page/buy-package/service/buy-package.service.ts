import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetAllCreditPackage } from '../../../model/class';

@Injectable({
  providedIn: 'root'
})
export class BuyPackageService {

  private buyPackageURL = 'http://localhost:8080/api/user/all/credit/package';

  constructor(private http: HttpClient, private router: Router) { }

  getAllPackages(): Observable<GetAllCreditPackage[]>{
    return this.http.get<GetAllCreditPackage[]>(this.buyPackageURL);
  }
}

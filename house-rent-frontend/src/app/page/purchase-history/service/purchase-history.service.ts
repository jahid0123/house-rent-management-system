import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPurchasePackageHistory } from '../../../model/class';

@Injectable({
  providedIn: 'root',
})
export class PurchaseHistoryService {
  private myPurchaseHistoryUrl =
    'http://localhost:8080/api/user/buy/package/me';

  constructor(private http: HttpClient) {}

  getPurchaseHistory(): Observable<MyPurchasePackageHistory[]> {
    const userId = localStorage.getItem('id');
    const safeUserId = userId ?? ''; // fallback to empty string if null
    const params = new HttpParams().set('id', safeUserId);

    return this.http.get<MyPurchasePackageHistory[]>(this.myPurchaseHistoryUrl, {params});
  }
}

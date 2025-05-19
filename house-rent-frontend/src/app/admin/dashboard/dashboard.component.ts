import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Router, RouterModule } from '@angular/router';
import { ManageUserService } from '../manage-user/service/manage-user.service';
import {
  GetAllCreditPackage,
  MyPurchasePackageHistory,
  RentPost,
  User,
} from '../../model/class';
import { ManagePostService } from '../manage-post/service/manage-post.service';
import { BuyPackageService } from '../../page/buy-package/service/buy-package.service';
import { PurchaseHistoryService } from '../../page/purchase-history/service/purchase-history.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Stats data

  users: User[] = [];
  rentPosts: RentPost[] = [];
  allCreditPackage: GetAllCreditPackage[] = [];
  purchaseHistory: MyPurchasePackageHistory[] = [];
  userCount = 0;
  postCount = 0;
  packageCount = 0;
  totalSales = 0;

  constructor(
    private userService: ManageUserService,
    private postService: ManagePostService,
    private buyPackageService: BuyPackageService,
    private purchaseService: PurchaseHistoryService,
  ) {}

  ngOnInit(): void {
    // Simulated data – Replace with API call if needed
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getAllUser().subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.userCount = res.length; // ✅ Update count here
      },
      error: (err) => {
        console.error('Failed to load user info:', err);
      },
    });

    this.postService.getAllPost().subscribe({
      next: (res: RentPost[]) => {
        this.rentPosts = res;
        this.postCount = res.length; // ✅ Update count here
      },
      error: (err) => {
        console.error('Failed to load post info:', err);
      },
    });

    this.buyPackageService.getAllPackages().subscribe({
      next: (res: GetAllCreditPackage[]) => {
        this.allCreditPackage = res;
        this.packageCount = res.length; // ✅ Update count here
      },
      error: (err) => {
        console.error('Failed to load packages:', err);
      },
    });

    this.purchaseService.getAllPurchaseHistory().subscribe({
      next: (res: MyPurchasePackageHistory[]) => {
        console.log('Purchase history:', res); // ✅ Check this in browser console
        this.purchaseHistory = res;
        this.totalSales = this.purchaseHistory.reduce(
          (sum, item) => sum + item.amountPaid,
          0,
        );
        console.log('Total sales:', this.totalSales); // ✅ Confirm calculation
      },
      error: (err) => {
        console.error('Failed to load purchase history:', err);
      },
    });
  }
}

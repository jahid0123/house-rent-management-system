import { Component, OnInit } from '@angular/core';
import { BuyPackageService } from './service/buy-package.service';
import { Router } from '@angular/router';
import { GetAllCreditPackage } from '../../model/class';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-buy-package',
  imports: [NgFor],
  templateUrl: './buy-package.component.html',
  styleUrl: './buy-package.component.css'
})
export class BuyPackageComponent implements OnInit {

  allCreditPackage: GetAllCreditPackage[] = [];

  constructor(private buyPackageService: BuyPackageService, private router: Router){}

  ngOnInit(): void {
    
    this.loadAllPackages();

  }

   loadAllPackages(): void {
      this.buyPackageService.getAllPackages().subscribe({
        next: (res: GetAllCreditPackage[]) => {
          this.allCreditPackage = res;
        },
        error: (err) => {
          console.error('Failed to load packages:', err);
        }
      });
    }

    buyPackage(creditPackageId: number): void {
  const userId = Number(localStorage.getItem('id'));

  if (confirm('Are you sure you want to buy this package?')) {
    const buyPackage = {
      userId,
      creditPackageId
    };

    this.buyPackageService.buyPackage(buyPackage).subscribe({
      next: (res) => {
        alert('Package purchased successfully.');
        this.router.navigateByUrl('/profile');
      },
      error: (err) => {
        alert('Purchase request failed!!');
      }
    });
  }
}



}

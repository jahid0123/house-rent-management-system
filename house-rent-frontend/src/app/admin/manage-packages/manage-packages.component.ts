import { Component, OnInit } from '@angular/core';
import { AddCreditPackage, GetAllCreditPackage } from '../../model/class';
import { BuyPackageService } from '../../page/buy-package/service/buy-package.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ManagePackagesService } from './service/manage-packages.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-packages',
  imports: [NgFor, FormsModule, NgStyle, CommonModule],
  templateUrl: './manage-packages.component.html',
  styleUrl: './manage-packages.component.css',
})
export class ManagePackagesComponent implements OnInit {


  allCreditPackage: GetAllCreditPackage[] = [];
  selectedPackage: AddCreditPackage = {
    id: 0,
    name: '',
    creditAmount: 0,
    price: 0,
  };
  showModal: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private buyPackageService: BuyPackageService,
    private router: Router,
    private manageService: ManagePackagesService
  ) {}

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
      },
    });
  }
  // Open modal to add package
  openAddModal() {
    this.isEditMode = false;
    this.selectedPackage = { id: 0, name: '', creditAmount: 0, price: 0 };
    this.showModal = true;
  }

  // Open modal to edit package
  openEditModal(pkg: any) {
    this.isEditMode = true;
    this.selectedPackage = { ...pkg }; // clone to avoid mutation
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Save package (add or update)
  // savePackage() {
  //   if (this.isEditMode) {
  //     // update logic
  //     const index = this.allCreditPackage.findIndex(
  //       (p) => p.id === this.selectedPackage.id
  //     );
  //     if (index !== -1) {
  //       this.allCreditPackage[index] = { ...this.selectedPackage };
  //     }
  //   } else {
  //     // add logic
  //     const newId = Date.now(); // temp ID
  //     this.allCreditPackage.push({ ...this.selectedPackage, id: newId });
  //   }
  //   this.closeModal();
  // }

  savePackage() {
  if (this.isEditMode) {
    // Edit existing package via PUT
    this.manageService.editPackage(this.selectedPackage)
      .subscribe({
        next: (updated) => {
          // const index = this.allCreditPackage.findIndex(p => p.id === updated.id);
          // if (index !== -1) {
          //   this.allCreditPackage[index] = updated;
          // }
          alert('Edited successfully.');
          this.closeModal();
          this.loadAllPackages();
          this.router.navigateByUrl('/manage-packages');
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
  } else {
    // Add new package via POST
    this.manageService.addPackage(this.selectedPackage)
      .subscribe({
        next: (created) => {
          //this.allCreditPackage.push(created);
          alert('Add package successfully.');
          this.closeModal();
          this.loadAllPackages();
          this.router.navigateByUrl('/manage-packages');
        },
        error: (err) => {
          console.error('Create failed:', err);
        }
      });
  }
}

  // Delete package
  deletePackage(id: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.manageService.deletePackage(id).subscribe(() => {
        this.loadAllPackages();
        this.router.navigateByUrl('/manage-packages');
      });
    }
  }
}

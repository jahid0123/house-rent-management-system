import { Component, NgModule, numberAttribute, OnInit } from '@angular/core';
import { GetPostedProperty } from '../model/class';
import { Router } from '@angular/router';
import { HomeService } from './service/home.service';
import { CommonModule, NgClass, NgFor, NgStyle } from '@angular/common';
import { Modal } from 'bootstrap';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgClass, NgFor, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  getAllPostedProperty: GetPostedProperty[] = [];
  displayedProperties: GetPostedProperty[] = [];
  paginatedProperties: GetPostedProperty[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  searchKeyword: string = '';
  selectedProperty: GetPostedProperty | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadAllProperties();
  }

  loadAllProperties(): void {
    this.homeService.getPostedProperty().subscribe({
      next: (res: GetPostedProperty[]) => {
        this.getAllPostedProperty = res.filter(property => property.isAvailable);
        this.applyFiltersAndSorting(); // Initial apply
      },
      error: (err) => {
        console.error('Failed to load properties:', err);
      }
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.applyFiltersAndSorting();
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedSort = target.value;
    this.applyFiltersAndSorting();
  }

  onSearch(): void {
    this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting(): void {
    let filtered = [...this.getAllPostedProperty];

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Apply search filter
    if (this.searchKeyword) {
      const keyword = this.searchKeyword.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(keyword) ||
        p.section.toLowerCase().includes(keyword) ||
        p.thana.toLowerCase().includes(keyword) ||
        p.district.toLowerCase().includes(keyword) ||
        p.division.toLowerCase().includes(keyword)
      );
    }

    // Apply sorting
    switch (this.selectedSort) {
      case 'priceLowToHigh':
        filtered.sort((a, b) => a.rentAmount - b.rentAmount);
        break;
      case 'priceHighToLow':
        filtered.sort((a, b) => b.rentAmount - a.rentAmount);
        break;
    }

    this.displayedProperties = filtered;
    this.totalPages = Math.ceil(this.displayedProperties.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedProperties();
  }

  updatePaginatedProperties(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProperties = this.displayedProperties.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProperties();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProperties();
    }
  }

  openModal(property: GetPostedProperty): void {
    this.selectedProperty = property;
    const modalEl = document.getElementById('propertyModal');
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  }

  unlockProperty(): void {
    const userId = Number(localStorage.getItem('id'));
    const propertyPostId = this.selectedProperty?.id;

    if (!userId || !propertyPostId) {
      this.router.navigateByUrl('/login');
      alert('User or property information is missing!');
      return;
    }

    const confirmUnlock = confirm('Property unlock costs 5 credits. Do you want to continue?');
    if (confirmUnlock) {
      this.homeService.unlockProperty(userId, propertyPostId).subscribe({
        next: () => {
          alert('Property unlocked successfully!');
          this.router.navigateByUrl("/unlock-property");
        },
        error: (err) => {
          console.error('Unlock failed:', err);
          alert('Failed to unlock property.');
        },
      });
    }
  }
}



// export class HomeComponent implements OnInit {


//   getAllPostedProperty: GetPostedProperty[] = [];
//   selectedProperty: GetPostedProperty | null = null;
  
//   // propertyPostId = this.selectedProperty?.id;
//   // userId = localStorage.getItem('id');


//   constructor(private router: Router, private homeService: HomeService) {}

//   ngOnInit(): void {
//     this.loadAllProperties();
//   }

//   // Load all posted properties
//   loadAllProperties(): void {
//     this.homeService.getPostedProperty().subscribe({
//       next: (res: GetPostedProperty[]) => {
//         this.getAllPostedProperty = res;
//       },
//       error: (err) => {
//         console.error('Failed to load properties:', err);
//       }
//     });
//   }

//   // Open modal with selected property details
//   openModal(property: GetPostedProperty): void {
//     this.selectedProperty = property;
//     const modalEl = document.getElementById('propertyModal');
//     if (modalEl) {
//       const modal = new Modal(modalEl);
//       modal.show();
//     }
//   }
// unlockProperty(): void {
//   const userId = Number(localStorage.getItem('id'));
//   const propertyPostId = this.selectedProperty?.id;

//   if (!userId || !propertyPostId) {
//     this.router.navigateByUrl('/login')
//     alert('User or property information is missing!');
//     return;
//   }

//   const confirmUnlock = confirm('Property unlock costs 5 credits. Do you want to continue?');

//   if (confirmUnlock) {
//     this.homeService.unlockProperty(userId, propertyPostId).subscribe({
//       next: (res) => {
//         alert('Property unlocked successfully!');
//         this.router.navigateByUrl("/unlock-property");
//       },
//       error: (err) => {
//         console.error('Unlock failed:', err);
//         alert('Failed to unlock property.');
//       },
//     });
//   }
// }

// }


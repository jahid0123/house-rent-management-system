import {
  AfterViewInit,
  Component,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { GetPostedProperty } from '../model/class';
import { Router } from '@angular/router';
import { HomeService } from './service/home.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
// export class HomeComponent implements OnInit, AfterViewInit {
//   properties: GetPostedProperty[] = [];
//   paginatedProperties: GetPostedProperty[] = [];
//   searchKeyword: string = '';
//   selectedSortOption: string = 'default';

//   currentPage: number = 1;
//   itemsPerPage: number = 6;
//   totalPages: number = 0;

//   private imageBaseUrl = 'http://localhost:8080/images/';

//   constructor(private homeService: HomeService) {}

//   ngOnInit(): void {
//     this.loadProperties();
//   }

//   ngAfterViewInit(): void {
//     // Swiper initialization done after properties load
//   }

//   loadProperties(): void {
//     this.homeService.getPostedProperty().subscribe({
//       next: (data) => {
//         this.properties = data.map((prop) => ({
//           ...prop,
//           imageUrls: (prop.imageFilenames ?? []).map(
//             (filename) => this.imageBaseUrl + filename
//           ),
//         }));

//         this.applyFilters();
//         this.initSwiper();
//       },
//       error: (err) => {
//         console.error('Error fetching properties:', err);
//       },
//     });
//   }

//   initSwiper(): void {
//     setTimeout(() => {
//       new Swiper('.mySwiper', {
//         loop: true,
//         pagination: { el: '.swiper-pagination', clickable: true },
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//       });
//     }, 0);
//   }

//   onSearch(): void {
//     this.currentPage = 1;
//     this.applyFilters();
//   }

//   onSortChange(): void {
//     this.currentPage = 1;
//     this.applyFilters();
//   }

//   applyFilters(): void {
//     let filtered = this.properties;

//     if (this.searchKeyword.trim()) {
//       const keyword = this.searchKeyword.toLowerCase();
//       filtered = filtered.filter(
//         (p) =>
//           p.title.toLowerCase().includes(keyword) ||
//           p.district.toLowerCase().includes(keyword) ||
//           p.division.toLowerCase().includes(keyword) ||
//           p.thana.toLowerCase().includes(keyword)
//       );
//     }

//     if (this.selectedSortOption === 'lowToHigh') {
//       filtered.sort((a, b) => a.rentAmount - b.rentAmount);
//     } else if (this.selectedSortOption === 'highToLow') {
//       filtered.sort((a, b) => b.rentAmount - a.rentAmount);
//     } else if (this.selectedSortOption === 'newest') {
//       filtered.sort(
//         (a, b) =>
//           new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
//       );
//     }

//     this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

//     this.paginatedProperties = filtered.slice(
//       (this.currentPage - 1) * this.itemsPerPage,
//       this.currentPage * this.itemsPerPage
//     );
//   }

//   goToPage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.applyFilters();
//     }
//   }

//   goToNextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.applyFilters();
//     }
//   }

//   goToPreviousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.applyFilters();
//     }
//   }
// }
export class HomeComponent implements OnInit {
  getAllPostedProperty: GetPostedProperty[] = [];
  selectedProperty: GetPostedProperty | null = null;

  // propertyPostId = this.selectedProperty?.id;
  // userId = localStorage.getItem('id');

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadAllProperties();
  }

  // Load all posted properties
  loadAllProperties(): void {
    this.homeService.getPostedProperty().subscribe({
      next: (res: GetPostedProperty[]) => {
        this.getAllPostedProperty = res;
      },
      error: (err) => {
        console.error('Failed to load properties:', err);
      },
    });
  }

  // Open modal with selected property details
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

    const confirmUnlock = confirm(
      'Property unlock costs 5 credits. Do you want to continue?'
    );

    if (confirmUnlock) {
      this.homeService.unlockProperty(userId, propertyPostId).subscribe({
        next: (res) => {
          alert('Property unlocked successfully!');
          this.router.navigateByUrl('/unlock-property');
        },
        error: (err) => {
          console.error('Unlock failed:', err);
          alert('Failed to unlock property.');
        },
      });
    }
  }
}

import { Component, numberAttribute, OnInit } from '@angular/core';
import { GetPostedProperty } from '../model/class';
import { Router } from '@angular/router';
import { HomeService } from './service/home.service';
import { NgClass, NgFor } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [NgClass, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
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
      }
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
    alert('User or property information is missing!');
    return;
  }

  const confirmUnlock = confirm('Property unlock costs 5 credits. Do you want to continue?');

  if (confirmUnlock) {
    this.homeService.unlockProperty(userId, propertyPostId).subscribe({
      next: (res) => {
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
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats = {
    users: 0,
    posts: 0,
    admins: 0,
    revenue: 0
  };

  constructor() {}

  ngOnInit(): void {
    // Simulate fetching data from backend
    this.fetchDashboardStats();
  }

  fetchDashboardStats(): void {
    // Replace this with real API call
    this.stats = {
      users: 1340,
      posts: 289,
      admins: 5,
      revenue: 420000
    };
  }
}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule, NgFor],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  constructor(private router: Router){}


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

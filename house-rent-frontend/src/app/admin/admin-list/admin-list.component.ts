import { Component, OnInit } from '@angular/core';
import { User } from '../../model/class';
import { ManageUserService } from '../manage-user/service/manage-user.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-list',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {
  admins: User[] = [];

  constructor(private userService: ManageUserService, private router: Router) {}

  ngOnInit(): void {
    // Simulated data – Replace with API call if needed
    this.loadUserInfo();
  }


   loadUserInfo(): void {
  
      this.userService.getAllUser().subscribe({
        next: (res: User[]) => {
          this.admins = res.filter(user => user.role === 'ADMIN');
        },
        error: (err) => {
          console.error('Failed to load user info:', err);
        }
      });
    }

  deleteUser(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.userService.deleteUser(id).subscribe({
        next: (res) =>{
          alert('User delete successfully.');
        },
        error: (err) =>{
          alert('User deletation failed!!!');
        }
      });
    }
  }
}
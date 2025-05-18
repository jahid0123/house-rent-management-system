import { Component, OnInit } from '@angular/core';
import { User } from '../../model/class';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ManageUserService } from './service/manage-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: ManageUserService, private router: Router) {}

  ngOnInit(): void {
    // Simulated data – Replace with API call if needed
    this.loadUserInfo();
  }


   loadUserInfo(): void {
  
      this.userService.getAllUser().subscribe({
        next: (res: User[]) => {
          this.users = res;
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
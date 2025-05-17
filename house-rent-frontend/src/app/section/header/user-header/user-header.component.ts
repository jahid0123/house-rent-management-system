import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-header',
  imports: [RouterModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit {
  user = {
    name: 'Guest',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const name = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatarUrl');

    if (name) this.user.name = name;
    if (avatar) this.user.avatarUrl = avatar;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
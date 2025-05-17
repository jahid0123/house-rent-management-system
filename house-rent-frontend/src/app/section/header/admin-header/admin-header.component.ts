import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {


  logout() {
  localStorage.clear();
  window.location.href = '/login';  // or use router.navigate
}

}

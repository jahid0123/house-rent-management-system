import { Component, OnInit } from '@angular/core';
import { GetUserInfo } from '../../model/class';
import { ProfileService } from './service/profile.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})

export class ProfileComponent implements OnInit {

  getUserInfo: GetUserInfo | undefined;

  editForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUserInfo();
  }

  initForms(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  loadUserInfo(): void {
    const userId = localStorage.getItem('id');
    if (!userId) return;

    this.profileService.getUserInfo().subscribe({
      next: (res: GetUserInfo) => {
        this.getUserInfo = res;

        this.editForm.patchValue({
          name: res.name,
          phone: res.phone
        });
      },
      error: (err) => {
        console.error('Failed to load user info:', err);
      }
    });
  }

  onEditUser(): void {
    const modal = new Modal(document.getElementById('editModal')!);
    modal.show();
  }

  onChangePassword(): void {
    const modal = new Modal(document.getElementById('passwordModal')!);
    modal.show();
  }

 submitEdit(): void {
  const userId = Number(localStorage.getItem('id'));

  if (this.editForm.valid) {
    const { name, phone } = this.editForm.value;

    const updatedData = {
      userId,
      name,
      phone,
    };

    this.profileService.editUserInfo(updatedData).subscribe({
      next: (res) => {
        alert("Successfully updated!")
        //alert(res.message); // 👈 Only shows "Profile updated successfully!"
        this.editForm.reset();
        
      },
      error: (err) => {
        alert(err.error.message || 'Failed to update user information!');
      },
    });
  }
}



 submitPasswordChange(): void {
  const userId = Number(localStorage.getItem('id'));

  if (this.passwordForm.valid) {
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }

    const passwordData = {
      userId,
      currentPassword,
      newPassword,
    };

    this.profileService.changePassword(passwordData).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.passwordForm.reset();
      },
      error: (err) => {
        alert(err.error.message || 'Failed to change password!');
      },
    });
  }
}

}


// export class ProfileComponent implements OnInit {
 
 
//   getUserInfo: GetUserInfo | undefined;


//   constructor(private profileService: ProfileService, private router: Router) {}

//   ngOnInit(): void {
//     this.loadUserInfo();
//   }

//   loadUserInfo(): void {
//     const userId = localStorage.getItem('id');
//     this.profileService.getUserInfo().subscribe({
//       next: (res: GetUserInfo) => {

//         this.getUserInfo = res;
//       },
//       error: (err) => {
//         console.error('Failed to load user info:', err);
//       },
//     });
//   }

//   onEditUser() {
//     // Open edit form or modal
//   }

//   onChangePassword() {
//     // Open password change form or modal
//   }
// }

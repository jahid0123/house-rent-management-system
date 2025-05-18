import { Component, OnInit } from '@angular/core';
import { Property } from '../../model/class';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PostPropertyService } from './service/post-property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-property',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './post-property.component.html',
  styleUrl: './post-property.component.css'
})
export class PostPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  categories = ['FAMILY', 'BACHELOR', 'SUBLET', 'ROOMMATE', 'SHOP', 'OFFICE', 'HOUSE']; // Example values

  constructor(private fb: FormBuilder, private postService: PostPropertyService, private router: Router) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: [''],
      category: [''],
      description: [''],
      address: [''],
      contactPerson: [''],
      contactNumber: [''],
      area: [''],
      availableFrom: [''],
      rentAmount: [''],
      division: [''],
      district: [''],
      thana: [''],
      section: [''],
      roadNumber: [''],
      houseNumber: [''],
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.previewUrls = []; // clear previous previews
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result); // add base64 image string to previewUrls
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFiles = Array.from(input.files);
  //     console.log('Selected files:', this.selectedFiles);
  //   }
  // }

  onSubmit(): void {

    const userID = Number(localStorage.getItem('id'));

    const formData = new FormData();

    if(this.propertyForm.valid){
      const { 
        title, category, description, address,
        contactPerson, contactNumber, area , availableFrom ,
        rentAmount, division, district, thana, section, roadNumber, houseNumber} = this.propertyForm.value;

      const propertyPostData = {
        userID, title, category, description, address,
        contactPerson, contactNumber, area , availableFrom ,
        rentAmount, division, district, thana, section, roadNumber, houseNumber,
    };    

    this.postService.postProperty(propertyPostData).subscribe({
      next: (res) => {
        alert("Property post sucessfully.");
        this.propertyForm.reset();
        this.router.navigateByUrl('/home');
        
      },
      error: (err) => {
        alert(err.error.message || 'Failed to post property');
      }
    });
  }
  
  }

}
import { Component, OnInit } from '@angular/core';
import { Property } from '../../model/class';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

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
  categories = ['FAMILY', 'BACHELOR', 'SUBLET']; // Example values

  constructor(private fb: FormBuilder) {}

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
    const formData = new FormData();
    const formValue = this.propertyForm.value;

    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    // TODO: Submit formData to backend using HttpClient
    console.log('Form submitted with:', formValue);
  }
}
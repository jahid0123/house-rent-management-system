import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  {
  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      patientName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      symptoms: [''],
      diagnosis: [''],
      medicines: this.fb.array([])
    });

    this.addMedicine(); // Add one by default
  }

  get medicineControls() {
    return this.prescriptionForm.get('medicines') as FormArray;
  }

  addMedicine() {
    const medGroup = this.fb.group({
      name: ['', Validators.required],
      dosage: [''],
      duration: [''],
      instructions: ['']
    });
    this.medicineControls.push(medGroup);
  }

  removeMedicine(index: number) {
    this.medicineControls.removeAt(index);
  }

  onSubmit() {
    if (this.prescriptionForm.valid) {
      console.log('Prescription Submitted:', this.prescriptionForm.value);
      // You can POST to backend here
    } else {
      console.log('Form Invalid');
    }
  }
}
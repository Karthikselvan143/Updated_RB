// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent implements OnInit{
//   contactForm!: FormGroup; // Ensure proper initialization

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.contactForm = this.fb.group({
//       name: [
//         '',
//         [Validators.required, Validators.minLength(3), this.noSpecialCharsOrNumbers]
//       ],
//       email: [
//         '',
//         [Validators.required, Validators.email, this.validEmail]
//       ],
//       phone: [
//         '',
//         [Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]
//       ],
//       message: [
//         '',
//         [Validators.required, Validators.minLength(10)]
//       ]
//     });
//   }

//   // Custom validator for name field to prevent special characters and numbers
//   noSpecialCharsOrNumbers(control: AbstractControl): ValidationErrors | null {
//     const value = control.value;
//     if (/[^a-zA-Z\s]/.test(value)) {
//       return { invalidName: true };
//     }
//     return null;
//   }

//   // Custom validator for email field to accept valid emails only
//   validEmail(control: AbstractControl): ValidationErrors | null {
//     const value = control.value;
//     // Regular expression to match emails with allowed special characters
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(value)) {
//       return { invalidEmail: true };
//     }
//     return null;
//   }

//   get f() {
//     return this.contactForm.controls;
//   }

//   onSubmit() {
//     if (this.contactForm.valid) {
//       // Handle form submission
//       console.log(this.contactForm.value);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  contactForm!: FormGroup;

  private apiUrl = 'Admin/CreateFeedback'; // Replace with your backend URL

  constructor(private fb: FormBuilder, private http: HttpClient,private service :ServiceService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), this.noSpecialCharsOrNumbers]
      ],
      email: [
        '',
        [Validators.required, Validators.email, this.validEmail]
      ],
      phoneNumber: [
        '',
        [Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]
      ],
      message: [
        '',
        [Validators.required, Validators.minLength(10)]
      ]
    });
  }

  // Custom validator for name field to prevent special characters and numbers
  noSpecialCharsOrNumbers(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (/[^a-zA-Z\s]/.test(value)) {
      return { invalidName: true };
    }
    return null;
  }

  // Custom validator for email field to accept valid emails only
  validEmail(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Regular expression to match emails with allowed special characters
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.service.post(this.apiUrl, this.contactForm.value).subscribe({
        next: (response) => {
          window.alert('Feedback submitted successfully');
          console.log("Feedback submitted");
          // Handle successful submission
          // For example, show a success message or clear the form
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
          // Handle submission error
          // For example, show an error message to the user
        }
      });
    }
  }
}

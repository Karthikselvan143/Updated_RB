import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Booking } from '../models/room.model';
import { environment } from '../environments/environments';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements  OnInit{
  bookings: Booking[] = [];
  loading = true;
  error: string | null = null;

  private apiUrl = 'http://localhost:5046/api/Payment/GetBookedRoomsPayments'; // Update with your API URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.http.get<Booking[]>(this.apiUrl).subscribe(
      data => {
        this.bookings = data.map((booking, index) => ({
          ...booking,
          id: index + 1 // Assign a unique index-based ID
        }));
        console.log('Bookings:', data);
        this.bookings = data;
        this.loading = false;
      },
      error => {
        this.error = 'An error occurred while fetching the data.';
        this.loading = false;
      }
    );
  }
  deleteBooking(id: number | undefined): void {
    if (!id) {
      this.error = 'Booking ID is undefined.';
      console.error('Cannot delete booking without an ID');
      return;
    }
    
    console.log(`Deleting booking with ID: ${id}`);  // Log the ID for debugging
  
    this.http.delete(`http://localhost:5046/api/Booking/${id}`).subscribe(
      () => {
        this.fetchBookings();  // Refresh bookings list
        window.alert('Booking Deleted Successfully!!');
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting booking:', error);
        this.error = 'Failed to delete booking';
      }
    );
  }
  

  toggleStatus(booking: Booking): void {
    console.log('Booking:', booking);
    if (!booking.id) {
      console.error('Booking ID is undefined');
      return;
    }
  
    booking.isBooked = !booking.isBooked;
    this.http.put(`${environment.apiUrl}/Bookings/${booking.id}`, booking).subscribe(
      () => this.fetchBookings(),
      error => {
        console.error('Error updating booking status:', error);
        this.error = 'Failed to update booking status';
      }
    );
  }

  cancelBooking(booking: Booking): void {
    const updatedBooking = { ...booking, isBooked: false };

    this.http.put(`${environment.apiUrl}/Bookings/${booking.id}`, updatedBooking)
      .subscribe(
        () => this.fetchBookings(),
        error => this.error = 'Failed to update booking status'
      );
  }
 

}

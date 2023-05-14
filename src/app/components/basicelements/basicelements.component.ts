import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface TripDay {
  date: string;
  location: string;
  activities: string[];
}

interface BuddyTrip {
  [userId: string]: string[];
}

@Component({
  selector: 'app-trip-details',
  template: `
    <div *ngFor="let day of days">
      <h2>{{ day.date }} - {{ day.location }}</h2>
      <ul>
        <li *ngFor="let activity of day.activities">{{ activity }}</li>
      </ul>
    </div>
    <hr>
    <button (click)="getBuddies()">Get Buddies</button>
    <div *ngIf="buddyTrips">
      <h3>Buddies</h3>
      <ul>
        <li *ngFor="let buddy of buddyTrips | keyvalue">
          <h4>{{ buddy.key }}</h4>
          <ul>
            <li *ngFor="let date of buddy.value">{{ date }}</li>
          </ul>
        </li>
      </ul>
    </div>
  `
})
export class TripDetailsComponent implements OnInit {
  userId: number;
  days: TripDay[];
  buddyTrips: BuddyTrip;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //let user_id = this.parent.parent.user_id
    this.http.get(`http://localhost:5000/trips/user/1`).subscribe((data: any) => {
      this.days = Object.keys(data).map(date => ({
        date,
        location: data[date].location,
        activities: data[date].activities
      }));
    });
  }

  getBuddies() {
    this.http.get('http://localhost:5000/buddies').subscribe((data: BuddyTrip) => {
      this.buddyTrips = data;
    });
  }
}
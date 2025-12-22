import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class Events {

  events = [
    {
      id: 'intro-meeting',
      title: 'Introductory Meeting',
      day: '12',
      month: 'FEB',
      time: '6:00 PM',
      location: "Students' Union Building",
      preview:
        'Meet the committee, learn what we’re about, and get involved in discussions around climate justice and green politics.'
    },
    {
      id: 'climate-cost-living',
      title: 'Climate & Cost of Living Discussion',
      day: '20',
      month: 'FEB',
      time: '5:30 PM',
      location: 'Attenborough Building',
      preview:
        'An open discussion on how climate policy intersects with the cost of living crisis, and what alternatives could look like.'
    },
    {
      id: 'green-campaigning',
      title: 'Green Campaigning Workshop',
      day: '05',
      month: 'MAR',
      time: '7:00 PM',
      location: 'Online',
      preview:
        'A practical session on campaigning, messaging, and grassroots organising within the Green movement.'
    }
  ];

  constructor() {}
}

import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './event-detail.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  eventId: string | null;

  constructor(private route: ActivatedRoute) {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }
}

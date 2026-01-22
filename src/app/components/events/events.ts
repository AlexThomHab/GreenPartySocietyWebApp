import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsApiService, EventDto } from '../../services/events-api.service';

type CalendarCell =
  | { kind: 'empty' }
  | { kind: 'day'; day: number; hasEvent: boolean };

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class Events implements OnInit {
  viewYear!: number;
  viewMonth!: number;

  monthEvents: EventDto[] = [];
  cells: CalendarCell[] = [];
  upcomingEventsForList: EventDto[] = [];
  isLoading = true;

  constructor(
    private eventsApi: EventsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.loadMonth(now.getFullYear(), now.getMonth());
  }

  prevMonth(): void {
    const d = new Date(this.viewYear, this.viewMonth - 1, 1);
    this.loadMonth(d.getFullYear(), d.getMonth());
  }

  nextMonth(): void {
    const d = new Date(this.viewYear, this.viewMonth + 1, 1);
    this.loadMonth(d.getFullYear(), d.getMonth());
  }

  private loadMonth(year: number, month: number): void {
    this.viewYear = year;
    this.viewMonth = month;
    this.isLoading = true;

    const from = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const to = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

    console.log('Loading events from', from.toISOString(), 'to', to.toISOString());

    this.eventsApi.getEventsInRange(from.toISOString(), to.toISOString()).subscribe({
      next: (events: EventDto[]) => {
        console.log('Received events:', events);
        this.monthEvents = events;

        const daysWithEvents = new Set<number>();
        for (const ev of events) {
          const start = new Date(ev.startsAt);
          console.log('Event starts at:', ev.startsAt, 'Day:', start.getDate());
          daysWithEvents.add(start.getDate());
        }

        console.log('Days with events:', Array.from(daysWithEvents));

        this.buildCalendarGrid(year, month, daysWithEvents);

        this.upcomingEventsForList = [...events].sort(
          (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );

        console.log('Setting isLoading to false');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Failed to load events', err);
        this.monthEvents = [];
        this.upcomingEventsForList = [];
        this.buildCalendarGrid(year, month, new Set<number>());
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private buildCalendarGrid(year: number, month: number, daysWithEvents: Set<number>): void {
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const jsDay = firstOfMonth.getDay();
    const mondayIndex = (jsDay + 6) % 7;

    const cells: CalendarCell[] = [];

    for (let i = 0; i < mondayIndex; i++) cells.push({ kind: 'empty' });

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ kind: 'day', day, hasEvent: daysWithEvents.has(day) });
    }

    while (cells.length % 7 !== 0) cells.push({ kind: 'empty' });

    this.cells = cells;
    console.log('Built calendar grid with', cells.length, 'cells');
  }

  monthLabel(): string {
    return new Date(this.viewYear, this.viewMonth, 1).toLocaleString(undefined, {
      month: 'long',
      year: 'numeric'
    });
  }
}

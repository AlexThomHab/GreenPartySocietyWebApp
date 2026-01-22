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

  getOutlookCalendarUrl(event: EventDto): string {
    const start = new Date(event.startsAt);
    const end = event.endsAt ? new Date(event.endsAt) : new Date(start.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date): string => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      body: event.description,
      location: event.location,
      startdt: formatDate(start),
      enddt: formatDate(end)
    });

    return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
  }

  getGoogleCalendarUrl(event: EventDto): string {
    const start = new Date(event.startsAt);
    const end = event.endsAt ? new Date(event.endsAt) : new Date(start.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      dates: `${formatDate(start)}/${formatDate(end)}`
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  private loadMonth(year: number, month: number): void {
    this.viewYear = year;
    this.viewMonth = month;
    this.isLoading = true;

    const from = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const to = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

    this.eventsApi.getEventsInRange(from.toISOString(), to.toISOString()).subscribe({
      next: (events: EventDto[]) => {
        this.monthEvents = events;

        const daysWithEvents = new Set<number>();
        for (const ev of events) {
          const start = new Date(ev.startsAt);
          daysWithEvents.add(start.getDate());
        }

        this.buildCalendarGrid(year, month, daysWithEvents);

        this.upcomingEventsForList = [...events].sort(
          (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );

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
  }

  monthLabel(): string {
    return new Date(this.viewYear, this.viewMonth, 1).toLocaleString(undefined, {
      month: 'long',
      year: 'numeric'
    });
  }
}

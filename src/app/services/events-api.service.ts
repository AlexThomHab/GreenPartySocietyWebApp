import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventDto {
  id: string;
  title: string;
  description: string;
  startsAt: string;   // ISO string (UTC from API)
  endsAt?: string | null;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class EventsApiService {
  private readonly baseUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEventsInRange(fromIso: string, toIso: string): Observable<EventDto[]> {
    const params = new HttpParams()
      .set('from', fromIso)
      .set('to', toIso);

    return this.http.get<EventDto[]>(`${this.baseUrl}/range`, { params });
  }


}

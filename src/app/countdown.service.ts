import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export type Deadline = {
  secondsLeft: number;
};

@Injectable({
  providedIn: 'root',
})
export class DeadlineService {
  getDeadline(): Observable<Deadline> {
    // return this.http.get<Countdown>('/api/deadline');
    // Simulating an HTTP request delay of 2 seconds and returning a mock response
    const mockResponse = { secondsLeft: 120 };
    return of(mockResponse).pipe(delay(2000));
  }
}

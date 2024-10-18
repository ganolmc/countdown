import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeadlineService } from '../countdown.service';
import { interval, map, Observable, of, switchMap, takeWhile } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-deadline',
  standalone: true,
  templateUrl: './deadline.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlineComponent {
  private readonly deadlineService = inject(DeadlineService);
  readonly secondsLeft$ = this.deadlineService
    .getDeadline()
    .pipe(switchMap(({ secondsLeft }) => this.createCountdown(secondsLeft)));

  private createCountdown(secondsLeft: number): Observable<number> {
    if (secondsLeft <= 0) {
      return of(0);
    }
    return interval(1000).pipe(
      map((elapsed) => secondsLeft - elapsed),
      takeWhile((remaining) => remaining >= 0)
    );
  }
}

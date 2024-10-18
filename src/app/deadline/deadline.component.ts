import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeadlineService } from '../deadline.service';
import { interval, map, Observable, of, switchMap, takeWhile } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-deadline',
  standalone: true,
  templateUrl: './deadline.component.html',
  imports: [AsyncPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlineComponent {
  private readonly deadlineService = inject(DeadlineService);
  readonly secondsLeft$ = this.deadlineService
    .getDeadline()
    .pipe(switchMap(({ secondsLeft }) => this.createCountdown(secondsLeft)));

  private createCountdown(secondsLeft: number): Observable<string> {
    if (secondsLeft <= 0) {
      return of('0');
    }
    return interval(1000).pipe(
      // convert to string to simplify managing 0 values
      map((elapsed) => (secondsLeft - elapsed).toString()),
      takeWhile((remaining) => Number(remaining) >= 0)
    );
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeadlineComponent } from './deadline/deadline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeadlineComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

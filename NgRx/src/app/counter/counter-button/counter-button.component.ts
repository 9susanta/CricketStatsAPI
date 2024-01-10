import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css'],
})
export class CounterButtonComponent {
  constructor(private store: Store<AppState>) {}
  onIncrement() {
    this.store.dispatch(increment({ count: 1 }));
  }
  onDecrement() {
    this.store.dispatch(decrement({ count: 1 }));
  }
  onReset() {
    this.store.dispatch(reset());
  }
}

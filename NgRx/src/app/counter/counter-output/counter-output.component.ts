import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounter } from '../state/counter.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  counter$ = this.store.select(getCounter);
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {}
}

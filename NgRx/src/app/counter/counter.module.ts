import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { NgModule } from '@angular/core';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { COUNTER_STATE_NAME } from './state/counter.selector';
import { counterReducer } from './state/counter.reducer';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
];
@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
  ],
})
export class CounterModule {}

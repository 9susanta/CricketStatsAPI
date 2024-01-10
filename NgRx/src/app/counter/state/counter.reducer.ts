import { Action, createReducer, on } from '@ngrx/store';
import { counterState, initialState } from './counter.state';
import { decrement, increment, reset } from './counter.action';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => {
    return {
      ...state,
      count: state.count + action.count,
    };
  }),
  on(decrement, (state, action) => {
    return {
      ...state,
      count: state.count - action.count,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      count: 0,
    };
  })
);

export function counterReducer(
  state: counterState = initialState,
  action: Action
) {
  return _counterReducer(state, action);
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';

export const STUDENT_STATE_NAME = 'students';

const getStudentState = createFeatureSelector<StudentState>(STUDENT_STATE_NAME);

export const getStudent = createSelector(getStudentState, (state) => {
  return state.students;
});

export const getStudentById = (index: number) =>
  createSelector(getStudentState, (state) => {
    return state.students.find((student) => student.id === index);
  });

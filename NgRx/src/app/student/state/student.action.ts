import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student.model';

export const ADD_STUDENT_ACTION = '[students page] add student';
export const UPDATE_STUDENT_ACTION = '[students page] update post';
export const DELETE_STUDENT_ACTION = '[students page] delete post';

export const addStudent = createAction(
  ADD_STUDENT_ACTION,
  props<{ student: Student }>()
);

export const updateStudent = createAction(
  UPDATE_STUDENT_ACTION,
  props<{ student: Student }>()
);

export const deleteStudent = createAction(
  DELETE_STUDENT_ACTION,
  props<{ id: number }>()
);

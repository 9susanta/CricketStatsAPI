import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student.model';

export const ADD_STUDENT_ACTION = '[students page] add student';
export const UPDATE_STUDENT_ACTION = '[students page] update student';
export const DELETE_STUDENT_ACTION = '[students page] delete student';

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

export const LOAD_STUDENTS = '[students page] load students';
export const LOAD_STUDENTS_SUCCESS = '[students page] load students success';

export const loadStudents = createAction(LOAD_STUDENTS);
export const loadStudentsSuccess = createAction(
  LOAD_STUDENTS_SUCCESS,
  props<{ students: Student[] }>()
);




import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student.model';


export const ADD_STUDENT_ACTION = '[students page] add student';
export const addStudent = createAction(
  ADD_STUDENT_ACTION,
  props<{ student: Student }>()
);

export const ADD_STUDENT_SUCCESS = '[students page] add students success';
export const addStudentSuccess = createAction(
  ADD_STUDENT_SUCCESS,
  props<{ student: Student }>()
);

export const UPDATE_STUDENT_ACTION = '[students page] update student';
export const updateStudent = createAction(
  UPDATE_STUDENT_ACTION,
  props<{ student: Student }>()
);

export const UPDATE_STUDENT_SUCCESS = '[student page] update student success';
export const updateStudentSuccess = createAction(
  UPDATE_STUDENT_SUCCESS,
  props<{ student: Update<Student> }>()
);

export const DELETE_STUDENT_ACTION = '[students page] delete student';
export const deleteStudent = createAction(
  DELETE_STUDENT_ACTION,
  props<{ id: number }>()
);

export const DELETE_STUDENT_SUCCESS = '[student page] delete student success';
export const deleteStudentSuccess = createAction(
  DELETE_STUDENT_SUCCESS,
  props<{ id: number }>()
);

export const LOAD_STUDENTS = '[students page] load students';
export const loadStudents = createAction(LOAD_STUDENTS);

export const LOAD_STUDENTS_SUCCESS = '[students page] load students success';
export const loadStudentsSuccess = createAction(
  LOAD_STUDENTS_SUCCESS,
  props<{ students: Student[] }>()
);





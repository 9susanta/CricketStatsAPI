import { Action, createReducer, on } from '@ngrx/store';
import { StudentState, initialState, studentAdapter } from './student.state';
import {addStudentSuccess, deleteStudentSuccess, loadStudentsSuccess, updateStudentSuccess } from './student.action';

const _studentsReducer = createReducer(
  initialState,
  on(addStudentSuccess, (state, action) => {
    return studentAdapter.addOne(action.student,{...state,count:state.count+1});
    // let student = { ...action.student };
    // return {
    //   ...state,
    //   students: [...state.students, student],
    // };
  }),
  on(updateStudentSuccess, (state, action) => {
    return studentAdapter.updateOne(action.student, state);
    // const updatedStudent = state.students.map((student) => {
    //   return action.student.id === student.id ? action.student : student;
    // });

    // return {
    //   ...state,
    //   students: updatedStudent,
    // };
  }),
  on(deleteStudentSuccess, (state, action) => {
    return studentAdapter.removeOne(action.id, state);
    // const updatedStudent = state.students.filter((student) => {
    //   return student.id !== action.id;
    // });
    // return {
    //   ...state,
    //   students: updatedStudent,
    // };
  }),
  on(loadStudentsSuccess, (state, action) => {
    return studentAdapter.setAll(action.students, {...state,count:state.count+1});
    // return {
    //   ...state,
    //   students: action.students,
    // };
  })
);
export function studentsReducer(
  state: StudentState = initialState,
  action: Action
) {
  return _studentsReducer(state, action);
}

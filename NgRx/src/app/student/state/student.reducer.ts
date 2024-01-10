import { Action, createReducer, on } from '@ngrx/store';
import { StudentState, initialState } from './student.state';
import { addStudent, deleteStudent, updateStudent } from './student.action';

const _studentsReducer = createReducer(
  initialState,
  on(addStudent, (state, action) => {
    let student = { ...action.student };
    student.id = (state.students.length ?? 0) + 1;
    return {
      ...state,
      students: [...state.students, student],
    };
  }),
  on(updateStudent, (state, action) => {
    const updatedStudent = state.students.map((student) => {
      return action.student.id === student.id ? action.student : student;
    });

    return {
      ...state,
      students: updatedStudent,
    };
  }),
  on(deleteStudent, (state, action) => {
    const updatedStudent = state.students.filter((student) => {
      return student.id !== action.id;
    });
    return {
      ...state,
      students: updatedStudent,
    };
  })
);
export function studentsReducer(
  state: StudentState = initialState,
  action: Action
) {
  return _studentsReducer(state, action);
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';

export const STUDENT_STATE_NAME = 'students';

const getStudentState = createFeatureSelector<StudentState>(STUDENT_STATE_NAME);

export const getStudent = createSelector(getStudentState, (state) => {
  return state.students;
});

  export const getStudentById = createSelector(
    getStudent,
    getCurrentRoute,
    (student, route: RouterStateUrl) => {
      return student ? student.find((student) => student.id === route.params['id']) : null;
    }
  );

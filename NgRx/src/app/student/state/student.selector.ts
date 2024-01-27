import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState, studentAdapter } from './student.state';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';

export const STUDENT_STATE_NAME = 'students';

const getStudentState = createFeatureSelector<StudentState>(STUDENT_STATE_NAME);
export const studentSelectors = studentAdapter.getSelectors();

export const getStudent = createSelector(getStudentState, studentSelectors.selectAll);
export const getStudentEntities = createSelector(getStudentState,studentSelectors.selectEntities);

  export const getStudentById = createSelector(
    getStudentEntities,
    getCurrentRoute,
    (student, route: RouterStateUrl) => {
      return student ? student[route.params['id']] : null;
    }
  );

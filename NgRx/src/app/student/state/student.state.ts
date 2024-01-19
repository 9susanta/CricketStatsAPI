import { Student } from 'src/app/models/student.model';

export interface StudentState {
  students: Student[];
}

export const initialState: StudentState = {
  students: [],
};

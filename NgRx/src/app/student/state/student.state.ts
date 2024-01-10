import { Student } from 'src/app/models/student.model';

export interface StudentState {
  students: Student[];
}

export const initialState: StudentState = {
  students: [
    { id: 1, name: 'Susanta', mark: 60 },
    { id: 2, name: 'Ramesh', mark: 50 },
  ],
};

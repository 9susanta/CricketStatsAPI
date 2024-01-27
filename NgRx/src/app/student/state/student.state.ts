import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Student } from 'src/app/models/student.model';

export interface StudentState extends EntityState<Student> {}
export const studentAdapter = createEntityAdapter<Student>();

export const initialState: StudentState = studentAdapter.getInitialState();





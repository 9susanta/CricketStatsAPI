import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Student } from 'src/app/models/student.model';

export interface StudentState extends EntityState<Student> {
    count:number
}
export const studentAdapter = createEntityAdapter<Student>();

export const initialState: StudentState = studentAdapter.getInitialState({
    count:0
});

export function sortByName(a: Student, b: Student): number {
    if (a.mark > b.mark) {
      return -1;
    }
  
    if (a.mark < b.mark) {
      return 1;
    }
  
    return 0;
  }




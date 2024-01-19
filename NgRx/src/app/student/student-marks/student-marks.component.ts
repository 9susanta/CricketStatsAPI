import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getStudent } from '../state/student.selector';
import { deleteStudent, loadStudents } from '../state/student.action';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css'],
})
export class StudentMarksComponent {
  students$ = this.store.select(getStudent);
  constructor(private store: Store<AppState>) {}
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deleteStudent({ id }));
    }
  }
  ngOnInit(): void {
    this.store.dispatch(loadStudents());
  }
}

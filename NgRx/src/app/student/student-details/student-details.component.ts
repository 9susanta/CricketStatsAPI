import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { AppState } from 'src/app/store/app.state';
import { getStudentById } from '../state/student.selector';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  student: Observable<Student>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.student = this.store.select(getStudentById);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addStudent } from '../state/student.action';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    mark: new FormControl(null, [Validators.required]),
  });
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {}
  onAddStudent() {
    if (!this.studentForm.valid) {
      return;
    }
    const student: Student = {
      name: this.studentForm.value.name,
      mark: this.studentForm.value.mark,
    };
    this.store.dispatch(addStudent({ student }));
  }
}

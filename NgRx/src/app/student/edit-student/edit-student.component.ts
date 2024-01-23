import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Student } from 'src/app/models/student.model';
import { getStudentById } from '../state/student.selector';
import { updateStudent } from '../state/student.action';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit, OnDestroy {
  student!: Student;
  studentForm!: FormGroup;
  studentSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.store.select(getStudentById).subscribe((student) => {
      if (student) {
        this.student = student;
        this.studentForm.patchValue({
          name: student.name,
          mark: student.mark,
        });
      }
    });
  }
  createForm() {
    this.studentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mark: new FormControl(null, [Validators.required]),
    });
  }
  onUpdate() {
    if (!this.studentForm.valid) {
      return;
    }

    const name = this.studentForm.value.name;
    const mark = this.studentForm.value.mark;

    const student: Student = {
      id: this.student.id,
      name,
      mark,
    };

    //dispatch the action
    this.store.dispatch(updateStudent({ student }));
    this.router.navigate(['students']);
  }

  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
  }
}

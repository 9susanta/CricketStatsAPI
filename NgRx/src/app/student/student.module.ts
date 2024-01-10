import { RouterModule, Routes } from '@angular/router';
import { StudentMarksComponent } from './student-marks/student-marks.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { STUDENT_STATE_NAME } from './state/student.selector';
import { studentsReducer } from './state/student.reducer';

const routes: Routes = [
  {
    path: '',
    component: StudentMarksComponent,
    children: [
      { path: 'add-student', component: AddStudentComponent },
      { path: 'edit-student/:id', component: EditStudentComponent },
    ],
  },
];
@NgModule({
  declarations: [
    StudentMarksComponent,
    AddStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(STUDENT_STATE_NAME, studentsReducer),
  ],
})
export class StudentModule {}

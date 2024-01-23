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
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './state/student.effects';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentMarksComponent,
    children: [
      { path: 'add-student', component: AddStudentComponent },
      { path: 'edit-student/:id', component: EditStudentComponent },
      {path:'details-student/:id',component:StudentDetailsComponent}
    ],
  },
];
@NgModule({
  declarations: [
    StudentMarksComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(STUDENT_STATE_NAME, studentsReducer),
    EffectsModule.forFeature([StudentEffects]),
  ],
})
export class StudentModule {}

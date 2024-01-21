import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, of } from "rxjs";
import { addStudent, addStudentSuccess, loadStudents, loadStudentsSuccess } from "./student.action";
import { StudentService } from "../service/student.service";

@Injectable()
export class StudentEffects {
  constructor(private actions$: Actions,private studentService:StudentService) {}

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStudents),
      mergeMap((action) => {
        return this.studentService.getStudent().pipe(
          map((students) => {
            return loadStudentsSuccess({ students });
          })
        );
      })
    );
  });
  addStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addStudent),
      mergeMap((action) => {
        return this.studentService.addStudent(action.student).pipe(
          map((data) => {
            const student = { ...action.student, id: +data };
            return addStudentSuccess({ student });
          })
        );
      })
    );
  });
}
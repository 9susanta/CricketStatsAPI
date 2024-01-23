import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, of, filter, switchMap } from "rxjs";
import { addStudent, addStudentSuccess, loadStudents, loadStudentsSuccess } from "./student.action";
import { StudentService } from "../service/student.service";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";

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

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/students/details-student');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.studentService.getStudentById(id).pipe(
          map((student) => {
            const studentData = [{ ...student, id }];
            return loadStudentsSuccess({ students: studentData });
          })
        );
      })
    );
  });
}
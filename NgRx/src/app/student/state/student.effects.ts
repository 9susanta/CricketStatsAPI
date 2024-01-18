import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, of } from "rxjs";
import { loadStudents, loadStudentsSuccess } from "./student.action";

@Injectable()
export class StudentEffects {
  constructor(private actions$: Actions) {}

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStudents),
      mergeMap((action) => {
        return of(loadStudentsSuccess(null));
      })
    );
  });
}
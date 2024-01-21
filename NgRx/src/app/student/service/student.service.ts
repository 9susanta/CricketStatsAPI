import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiBaseUrl: string = 'https://localhost:7187/api/';
  constructor(private http:HttpClient) { }
  getStudent(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.apiBaseUrl+"Student/GetStudent")
      .pipe(
        map((data) => {
          const student: Student[] = [];
          for (let key in data) {
            student.push({ ...data[key], id: +key });
          }
          return student;
        })
      );
  }
}

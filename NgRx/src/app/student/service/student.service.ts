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
  addStudent(student: Student): Observable<{ name: string,mark:number }> {
    return this.http.post<{ name: string,mark:number }>(this.apiBaseUrl+"Student/PostStudent",
    student
    );
  }
  updateStudent(student: Student) {
    return this.http.patch(
      this.apiBaseUrl+"Student/DeleteStudent/"+student.id,
      student
    );
  }

  deletePost(id: number) {
    return this.http.delete(this.apiBaseUrl+"Student/DeleteStudent/"+id);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(
      this.apiBaseUrl+"Student/GetStudentById/"+id
    );
  }
}

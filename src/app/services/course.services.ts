import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PreviewCourse } from "../model/preview.course";
import { Course } from "../model/course";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    private httpClient : HttpClient = inject(HttpClient);
    private readonly baseUrl =
        `${environment.apiUrl}/courses`;

    public all(page : number, searchedCourse : string) : Observable<PreviewCourse[]> {
        return this.httpClient.get<PreviewCourse[]>(this.baseUrl + "all?page=" + page + "&searchedCourseName=" + searchedCourse);       
    }

    public find(id : number) : Observable<Course> {
        return this.httpClient.get<Course>(this.baseUrl + "find/" + id);
    }

}
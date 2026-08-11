import { inject, Injectable } from "@angular/core";
import { Course } from "../model/course";
import { CourseService } from "../services/course.services";

@Injectable({
    providedIn: 'root'
})
export class ViewCourseDelegator {

    private courseService = inject(CourseService);

    public id : number = 0;
    public course : Course | undefined = undefined;

    public update(id : number) : void {
        this.id = id;
        this.courseService.find(id)
        .forEach(next => {
            this.course = next;
        });
    }


}
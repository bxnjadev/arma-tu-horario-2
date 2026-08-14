import { Component, inject } from '@angular/core';
import { ViewCourseDelegator } from '../../delegator/view.course.delegator';
import { Course, CourseSchedule } from '../../model/course';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Schedule } from '../../services/schedule';

@Component({
  selector: 'app-view-course',
  imports: [NgIf,
    NgFor,
    NgClass
  ],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent {

    private readonly initial_letter_character = 65;
    private readonly days : string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    private readonly schedule : Schedule = inject(Schedule);
    private viewCourseDelegator = inject(ViewCourseDelegator);

    public proffesorToText() : string {
      var result = '';


      var course = this.getCourse();
      if(course !== undefined) {
        let professors = course.professors;
        for(var proffesor of professors) {
            result += proffesor.name + " ";
        }
      }

      return result;
    }

    public getCourse() : Course | undefined {
      return this.viewCourseDelegator.course;
    }

    public getDays() : string[] {
      return this.days;
    }

    public addCourse() {
      let course : Course | undefined = this.viewCourseDelegator.course;
      if(course === undefined) {
        return;
      }

      let courseSchedule : CourseSchedule = {
        name : course.name,
        id : course.id,
        color : '',
        section : course.section,
        classes : course.blocks,
        hours : course.hours,
        letter : String.fromCharCode(this.initial_letter_character + this.schedule.totalCourses())
      };

      this.schedule.addCourse(
        courseSchedule
      );
    }

    public slice(content : string, size : number) : string {
      return content.slice(0, size);
    }

}

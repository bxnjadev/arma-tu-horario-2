import { Component, inject } from '@angular/core';
import { Schedule } from '../../services/schedule';
import { NgFor } from '@angular/common';
import { CourseSchedule } from '../../model/course';

@Component({
  selector: 'app-show-courses-selected',
  imports: [NgFor],
  templateUrl: './show-courses-selected.component.html',
  styleUrl: './show-courses-selected.component.css'
})
export class ShowCoursesSelectedComponent {

  private readonly schedule : Schedule = inject(Schedule);


  public getSchedule() : Schedule {
    return this.schedule;
  }

  public deleteCourse(id : number) : void {
    this.schedule.deleteCourse(id);
  }

  trckByCourseId(index : number, course : CourseSchedule) {
    return course.id;
  }

}

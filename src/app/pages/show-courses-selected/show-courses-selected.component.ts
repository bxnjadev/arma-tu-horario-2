import { Component, inject } from '@angular/core';
import { Schedule } from '../../services/schedule';
import { NgFor } from '@angular/common';
import { CourseSchedule } from '../../model/course';
import { ViewCourseDelegator } from '../../delegator/view.course.delegator';

@Component({
  selector: 'app-show-courses-selected',
  imports: [NgFor],
  templateUrl: './show-courses-selected.component.html',
  styleUrl: './show-courses-selected.component.css'
})
export class ShowCoursesSelectedComponent {

  private readonly schedule : Schedule = inject(Schedule);
  private viewCourseDelegator = inject(ViewCourseDelegator);

  public getSchedule() : Schedule {
    return this.schedule;
  }

  public searchCourse(id : number) : void {
    this.viewCourseDelegator.update(id);
  }

  public deleteCourse(id : number) : void {
    this.schedule.deleteCourse(id);
  }

  public getTotalHours(): number {
    return this.schedule.getCountHours();
  }

  trckByCourseId(index : number, course : CourseSchedule) {
    return course.id;
  }

}

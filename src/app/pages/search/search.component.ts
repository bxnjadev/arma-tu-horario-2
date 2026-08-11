import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.services';
import { PreviewCourse } from '../../model/preview.course';
import { NgFor } from '@angular/common';
import { ViewCourseDelegator } from '../../delegator/view.course.delegator';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private readonly debounceTimeMs = 500;
  private searchSubject : Subject<string> = new Subject<string>();


  private searchedName = '';

  private coursesPreview : PreviewCourse[] = [];
  private viewCourseDelegator = inject(ViewCourseDelegator);

  private page : number = 1;
  private readonly courseService : CourseService = inject(CourseService);

  ngOnInit(): void {
    this.update();

    this.searchSubject
    .pipe(debounceTime(this.debounceTimeMs))
    .subscribe((searchValue) => {
     this.performSearch(searchValue);
   });
  }

   public proffesorToText(course : PreviewCourse) : string {
      var result = '';


      if(course !== undefined) {
        let professors = course.professors;
        for(var proffesor of professors) {
            result += proffesor.name + " ";
        }
      }

      return result;
    }

  public update() : void {
    this.courseService.all(this.page,  this.searchedName)
    .forEach(next => {
        this.coursesPreview = next;
    })
  }

  public getPreviewCourses() : PreviewCourse[] {
    return this.coursesPreview;
  }

  public searchCourse(id : number) {
      this.viewCourseDelegator.update(id);
  }

  public next() {
    this.page++;
    this.update();
  }

  public previous() {
    this.page--;
    this.update();
  }

  public performSearch(value : string) : void {
    this.page = 1;
    this.searchedName = value;
    this.update();
  }

  public getPage() : number {
    return this.page;
  }

  public onSearch(event : Event) : void {
    let input = event.target as HTMLInputElement;
    let inputAsString = input.value;
    console.log(inputAsString);
    this.searchSubject.next(inputAsString);
}

  public splitIfIsMajor(str : string, size : number) {
    if(str.length < size) {
        return str;
    }
    return str.slice(0, size) + "...";  
  }



}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { ViewCourseComponent } from './pages/view-course/view-course.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShowCoursesSelectedComponent } from './pages/show-courses-selected/show-courses-selected.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent,
    SearchComponent,
    ViewCourseComponent,
    ScheduleComponent,
    ShowCoursesSelectedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'arma-tu-horario';
}

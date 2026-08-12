import { NgFor } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { Schedule } from '../services/schedule';
import { CourseBlockGroup } from '../model/course';

@Component({
  selector: 'app-schedule',
  imports: [NgFor],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent  {

  private screenWidthLittle = 786;
  private screenSmall = window.innerWidth < this.screenWidthLittle;

  private currentChar : string = 'A'; 
  private readonly hours : Map<string, string> = new Map()
  .set("A", "08:10 - 09:40")
  .set("B", "09:55 - 11:25")
  .set("C", "11:40 - 13:10")
  .set("D", "14:30 - 16:00")
  .set("E", "17:15 - 18:00")
  .set("F", "18:00 - 19:30")
  .set("G", "19:45 - 21:15");
  
  private readonly schedule : Schedule = inject(Schedule);

  getCurrentCharAndIncrement() {
    let actual = this.currentChar;
    let code = this.currentChar.charCodeAt(0);
    code++;

    if(code == 72) {
      code = 65;
    }

    this.currentChar = String.fromCharCode(code);
    return actual + " (" + this.hours.get(actual) + ")";
  }

  @HostListener("window:resize")
  onResize() : void {
    this.screenSmall = window.innerWidth < this.screenWidthLittle;
  }

  getScheduleMatrix() : CourseBlockGroup[][] {
    return this.schedule.getMatrix();
  }

  public blockToText(courseBlockGroup : CourseBlockGroup) : string {

        if(this.screenSmall) {
          console.log("Width menor");
          return courseBlockGroup.letter;
        }

        console.log("Width normal");
        let text = '';

        for(let group of courseBlockGroup.group_ids) {
            text += group.name + " " + group.room + " ";
        }

        return text;
  }


}

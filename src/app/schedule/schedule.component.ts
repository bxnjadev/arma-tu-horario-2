import { NgFor } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { Schedule } from '../services/schedule';
import { CourseBlockGroup } from '../model/course';
import { ExcelScheduleDownloadService } from '../services/excel.schelude.download.service';

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
  .set("E", "16:15 - 17:45")
  .set("F", "18:00 - 19:30")
  .set("G", "19:45 - 21:15");
  
  private readonly schedule : Schedule = inject(Schedule);
  private readonly excelDownloaded : ExcelScheduleDownloadService = inject(ExcelScheduleDownloadService);

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

  downloadExcel() {
    this.excelDownloaded.generateScheduleExcel(this.schedule.getMatrix());
  }

  getScheduleMatrix() : CourseBlockGroup[][] {
    return this.schedule.getMatrix();
  }

  public blockToText(courseBlockGroup : CourseBlockGroup) : string {

        if(this.screenSmall) {
          return courseBlockGroup.letter;
        }

        let text = '';

        for(let group of courseBlockGroup.group_ids) {
            text += group.name + " " + group.room + " ";
        }

        return text;
  }


}

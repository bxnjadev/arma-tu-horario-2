import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Schedule } from '../services/schedule';

@Component({
  selector: 'app-schedule',
  imports: [NgFor],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

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

  getScheduleMatrix() : string[][] {
    return this.schedule.getMatrix();
  }

}

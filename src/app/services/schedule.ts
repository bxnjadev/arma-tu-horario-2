import { Injectable } from "@angular/core";
import { CourseSchedule } from "../model/course";
import { Matrixs } from "../util/matrixs";
import { ScheduleHelper } from "../util/schedule.helper";
import { StringMatrixFunctional } from "../util/string.matrix.functional";

@Injectable({
    providedIn: 'root'
})
export class Schedule {

    private readonly daysToString : Map<string,number> = new Map()
    .set("Lunes", 0)
    .set("Martes", 1)
    .set("Miércoles", 2)
    .set("Jueves", 3)
    .set("Viernes", 4)
    .set("Sabado", 5);

    private readonly matrix : string[][]= Matrixs.create("", 7, 6);

    private readonly courses : Map<number,CourseSchedule> = new Map(); 

    private readonly courseList : CourseSchedule[] = [];

    private updateCourseList() : void {
        this.courseList.length = 0;

        this.courseList.push(...
            this.courses.values());
    }

    public addCourse(courseSchedule : CourseSchedule) : void {
        console.log("Agregando a la matriz");
        this.courses.set(courseSchedule.id, courseSchedule);

         for(let classT of courseSchedule.classes) {
                console.log(classT);
                let blocks = ScheduleHelper.getHours(classT.blockValue);

                console.log(blocks);

                for(let block of blocks) {

                    let row = ScheduleHelper.getBlockAsInt(block);
                    let column = this.daysToString.get(classT.day);

                    console.log(row + " , " + column);
                    
                    if(column === undefined) {
                        continue;
                    }
    
                    this.matrix[row][column] = this.matrix[row][column] + " " + courseSchedule.name + " - " +  classT.room + " "; 
                }

         }
        this.updateCourseList();
    }

    public deleteCourse(id : number) {
        let course = this.courses.get(id);
        if(course === undefined) {
            return;
        }

        for(let classT of course.classes) {
            let blocks = ScheduleHelper.getHours(classT.blockValue);

            for(let block of blocks) {

                let row = ScheduleHelper.getBlockAsInt(block);
                let column = this.daysToString.get(classT.day);
                
                if(column === undefined) {
                    continue;
                }

                this.matrix[row][column] = "";
            }
        }

        this.courses.delete(id);
        this.updateCourseList();

    }
    
    public removeCourse(id : number) : void {
        this.courses.delete(id); 
        this.updateCourseList();
    }

    public getMatrix() {
        return this.matrix;
    }

    public getCourses() : CourseSchedule[]  {
        return this.courseList;
    }

}
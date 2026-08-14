import { Injectable } from "@angular/core";
import { CourseBlockGroup, CourseSchedule } from "../model/course";
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

    private readonly COLORS_AVAILABLE = [
        "#4CAF72",
        "#5B8FD9",
        "#8A6BBE",
        "#D47FA5",
        "#D98A5B",
        "#D6B84C",
        "#D66B6B",
        "#5BAFC1",
        "#55A99F",
        "#A17A52"
    ];
    private readonly COLORS_TAKE : string[] = []

    private matrix : CourseBlockGroup[][];

    private readonly courses : Map<number,CourseSchedule> = new Map(); 

    private readonly courseList : CourseSchedule[] = [];

    private countHours : number = 0;

    constructor() {
        this.matrix = Matrixs.createFactory( () => ({ letter : '', color: '', group_ids: [] }), 7, 6);
    }

    private takeRandomColor() : string {
        const index = Math.floor(Math.random() * this.COLORS_AVAILABLE.length);
        const element = this.COLORS_AVAILABLE.splice(index, 1)[0];

        this.COLORS_TAKE.push(element);
        return element;
    }

    private removeColor(color : string) : void {
        const index = this.COLORS_TAKE.indexOf(color);
        this.COLORS_TAKE.splice(index, 1);

        this.COLORS_AVAILABLE.push(color);
    }

    private updateCourseList() : void {
        this.courseList.length = 0;

        this.courseList.push(...
            this.courses.values());
    }

    public getCountHours() : number {
        return this.countHours;
    }

    public totalCourses() : number {
        return this.courseList.length;
    }

    public addCourse(courseSchedule : CourseSchedule) : void {

        if(this.courses.has(courseSchedule.id)) {
            return;
        }

        courseSchedule.color = this.takeRandomColor();

        let sectionString = courseSchedule.section.toString();

        if(!sectionString.startsWith("L")) {
            this.countHours += courseSchedule.hours;
        
        }

        this.courses.set(courseSchedule.id, courseSchedule);

         for(let classT of courseSchedule.classes) {
                let blocks = ScheduleHelper.getHours(classT.blockValue);

                for(let block of blocks) {

                    let row = ScheduleHelper.getBlockAsInt(block);
                    let column = this.daysToString.get(classT.day);
        
                    if(column === undefined) {
                        continue;
                    }
    
                    let courseGroup = this.matrix[row][column];
                    
                    courseGroup.group_ids.push({
                        name : courseSchedule.name,
                        room : classT.room,
                        id : courseSchedule.id,
                    });
                    
                    if(courseGroup.group_ids.length == 1) {
                        courseGroup.letter = courseSchedule.letter;
                    } else {
                        courseGroup.letter += ", " + courseSchedule.letter;
                    }

                    courseGroup.color = courseSchedule.color;

                }

         }


        console.log(this.matrix);

        this.updateCourseList();
    }

    public deleteCourse(id : number) {
        let course = this.courses.get(id);
       
        if(course === undefined) {
            return;
        }

        let section = course.section.toString();
        if(!section.startsWith("L")) {
            this.countHours -= course?.hours;
        }
        

        for(let classT of course.classes) {
            let blocks = ScheduleHelper.getHours(classT.blockValue);

            for(let block of blocks) {

                let row = ScheduleHelper.getBlockAsInt(block);
                let column = this.daysToString.get(classT.day);
                
                if(column === undefined) {
                    continue;
                }

                let courseGroup = this.matrix[row][column];
                let index_value = -1;

                for(let i = 0; i < courseGroup.group_ids.length; i++) {
                    let group = courseGroup.group_ids[i];

                    if(group.id == id) {
                        index_value = i;
                        break;
                    }
                }
                
                if(index_value != -1) {
                    courseGroup.group_ids.splice(index_value, 1);
                }
                
                if(courseGroup.group_ids.length == 0) {
                    courseGroup.letter = '';
                    
                }else {
                    courseGroup.letter = courseGroup.letter.replace(course.letter, "");
                }

                let color = courseGroup.color;
                this.removeColor(color);
                courseGroup.color = '';
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
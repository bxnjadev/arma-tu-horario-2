import { Professor } from "./professor";


export interface Course {

    nrc : number;
    id : number;
    name : string;
    description : string;
    hours : number;
    courseNumber : number;
    section : number;
    period : string;
    universityType : string;
    blocks : Class[];
    professors : Professor[];


}

export interface Class {

    id : number;
    day : string;
    blockValue : string;
    room : string;
}

export interface CourseSchedule {

    letter : string;
    id : number;
    name : string;
    section : number;
    hours : number;
    classes : Class[];

}

export interface CourseBlockGroup {
    letter : string;
    group_ids : CourseBlock[];

}

export interface CourseBlock {
    name : string;
    room : string;
    id : number;
}
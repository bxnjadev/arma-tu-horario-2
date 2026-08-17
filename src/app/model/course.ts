import { Professor } from "./professor";


export interface Course {

    nrc : number;
    id : number;
    name : string;
    available : number;
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
    color : string;
    id : number;
    name : string;
    section : number;
    hours : number;
    proffesor : string;
    nrc : number;
    classes : Class[];

}

export interface CourseBlockGroup {
    color : string;
    letter : string;
    group_ids : CourseBlock[];

}

export interface CourseBlock {
    name : string;
    room : string;
    id : number;
}
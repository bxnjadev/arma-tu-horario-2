import { Professor } from "./professor"

export interface PreviewCourse {
    nrc : string,
    id : number,
    name : string,
    universityType : string
    section : string
    professors : Professor[]
}
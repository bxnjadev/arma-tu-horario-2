import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CourseBlockGroup } from "../model/course";

@Injectable({
    providedIn: 'root'
})
export class ExcelScheduleDownloadService { 

    private readonly rows = [2, 3,4,5,6,7,8]
    private readonly columns = ["B", "C", "D", "E", "F", "G"]

    private readonly blocks = ['A','B','C','D','E','F'];
    private readonly days = ['Lunes','Martes','Miércoles','Jueves','Viernes']

    private readonly rootFile = "/assets/plantillas/plantilla.xlsx";
    private http = inject(HttpClient);

    private convertBlockToString(group : CourseBlockGroup) {
        let result = '';

        for(let block of group.group_ids) {
            result += block.name + " - " + block.room + " "; 
        }

        return result;
    }

    private obtenerRango(
        blocks: string[],
        columns: string[]
        ): string {
        const ultimaFila = blocks.length + 1;
        const ultimaColumna = columns[columns.length - 1];

        return `A1:${ultimaColumna}${ultimaFila}`;
    }

    public generateScheduleExcel(groups : CourseBlockGroup[][]) : void {
        
         const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.aoa_to_sheet([[]]);
                
        worksheet['A1'] = {
                    't': 's',
                    'v': 'Bloque'
        }

        
        for(let i = 0; i < this.blocks.length; i++) {
                    let index = 2 + i;
                    worksheet['A' + index] = {
                        't': 's',
                        'v': this.blocks[i]
                    }
                }

        for(let i = 0; i < this.days.length; i++) {
                    worksheet[this.columns[i] + 1] = {
                        't': 's',
                        'v': this.days[i]
                }
        }

        console.log("Holaaaaa");

        for(let i = 0; i < groups.length; i++) {
            console.log(" Hola 1 ");
            
            for(let j = 0; j < groups[i].length; j++) {
                let group = groups[i][j];
                        
                    let row = this.rows[i];
                    let column = this.columns[j];

                    console.log("> " + group.group_ids.length);

                    if(group.group_ids.length != 0) {
                        
                            let coord = column + row;

                            console.log("Coord = " + coord);
                            worksheet[coord] = {
                                    t: 's',
                                    v: this.convertBlockToString(group)
                            
                            }
                    }
             
                
            }

        }

        worksheet['!ref'] = this.obtenerRango(this.blocks, this.columns);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Horario'
        );

        const content = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        const blob = new Blob([content], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(blob, 'horario.xlsx');

    }

}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelScheduleDownloadService { 

    private readonly rootFile = "assets/plantillas/plantilla.xlsx";
    private http = inject(HttpClient);

    public generateScheduleExcel() : void {
        
        this.http.get(this.rootFile, {
            responseType: 'arraybuffer'
        }).subscribe({
            next: (content: ArrayBuffer) => {
                const workbook = XLSX.read(content, {
                    type: 'array',
                    cellDates: true 
                });

                const nameSheet = workbook.SheetNames[0];
                const sheet = workbook.Sheets[nameSheet];

                if(!sheet) {
                    throw new Error("No se encontró la hoja de cálculo");
                }

                
            }

        })

    }

}
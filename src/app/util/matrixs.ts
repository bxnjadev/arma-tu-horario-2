

/**
 * This is a utility class that contains a set methods
 * for make operations in array 2D
 */

import { Predicate } from "@angular/core";

export class Matrixs {

    private constructor() {}

    /**
     * Create a new matrix of valors type T
     * the method need the dimension for create it
     * and default value for assign to matrix
     * @param defaultValue the default value for assign 
     * @param rows the number of rows 
     * @param columns the number of columns 
     * @returns a new matrix with (rows,columns) and value T
     */

    public static create<T>(defaultValue : T,
        rows : number,
        columns : number
    ) : T[][] {
        let matrix : T[][] = [];
        for(let i = 0; i < rows; i++){
            let row : T[] = [];
            for(let j = 0; j < columns; j++) {
                row.push(defaultValue);
            }
            matrix.push(row);
        }
        
        return matrix;
    } 

    /**
     * Fill the matrix with a specific value of type T
     * @param matrix the matrix where the values are filled
     * @param value the value for fill
     */

    public static fill<T>(matrix : T[][],
        value : T
    ) : void {
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = value;
            }
        }
    }

    /**
     * Fill the matrix with a specific value of type T
     * if this cell meets a condition
     * @param matrix the matrix where the values are filled
     * @param value the value for fill
     * @param predicate the condition to evaluate 
     */

    public static fillIf<T>(matrix : T[][],
        value : T, 
        predicate : Predicate<T>
    ) : void {
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++) {
                if(predicate(value)){
                    matrix[i][j] = value;
                }
            }
        }
    }

}
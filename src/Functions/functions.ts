import {v4 as uuidv4} from 'uuid';
import {IColumnsData, IRowData, ITableData} from "../Types/types";
import {getRandomInt} from "./utils";

export async function createColumn() {
  const numberOfColumn = getRandomInt(2, 100)
  const columnNames: IColumnsData[] = new Array(numberOfColumn).fill(null).map((_, i) => {
        return {id: uuidv4(), name: `Обработка${i + 1}`}
      }
  )
  return await new Promise((resolve) => setTimeout(() => resolve(columnNames), 1500)) as IColumnsData[]
}

export async function createTable(column: IColumnsData[]) {
  const numberOfRows = getRandomInt(2, 100)

  const rowsNames: IRowData[] = new Array(numberOfRows).fill(null).map((_, i) => {
        const cells = new Array(column.length).fill(null).map((_) => {
          const randomBool = Math.random() < 0.5;
          return {id: uuidv4(), value: randomBool}
        })

        return {id: uuidv4(), name: `Заказ${i + 1}`, cells: cells}
      }
  )

  return await new Promise((resolve) => setTimeout(() => resolve({
    columnNames: column,
    rows: rowsNames
  }), 1500)) as ITableData
}

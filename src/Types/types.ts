export interface ICellsData {
  id: string;
  value: boolean;
}

export interface IRowsData {
  id: string;
  name: string;
  cells: ICellsData[]
}
export interface IColumnsData {
  id: string;
  name: string;
}
export interface ITablesData {
  columnNames: IColumnsData[]
  rows: IRowsData[]
}

export enum Loading { Column, Row, All}

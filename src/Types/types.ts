export interface ICellData {
  id: string;
  value: boolean;
}

export interface IRowData {
  id: string;
  name: string;
  cells: ICellData[]
}
export interface IColumnsData {
  id: string;
  name: string;
}
export interface ITableData {
  columnNames: IColumnsData[]
  rows: IRowData[]
}

export enum Loading { Column, Row, All}

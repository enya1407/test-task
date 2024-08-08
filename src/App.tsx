import {createContext, memo, useEffect, useState} from 'react';
import './App.css';
import {createColumn, createTable} from "./Functions/functions";
import Table from "./Components/Table/Table";
import {v4 as uuidv4} from 'uuid';
import {IRowData, ITableData, Loading} from "./Types/types";
import {createPortal} from "react-dom";
import ModalDelete from "./Components/ModalDelete/ModalDelete";


const context: { tableData: ITableData, deleteRow: (id: string) => void, editRow: (row: IRowData) => void } = {
  tableData: {
    columnNames: [
      {id: "1", name: "Обработка 1"}
    ],
    rows: [
      {id: "1", name: "заказ1", cells: [{id: "1", value: true}]},
    ]
  }, deleteRow: (id) => {
  }, editRow: (id) => {
  }
}
export const TableContext = createContext(context);

function App() {
  const [loading, setLoading] = useState<Loading>(Loading.Column)
  const [tableData, setTableData] = useState<ITableData>({columnNames: [], rows: []})
  const [modal, setModal] = useState(false)
  const [deletedElement, setDeletedElement] = useState("")

  function addRow() {
    setTableData(({columnNames, rows}) => {

      const nextRow: IRowData = {
        id: uuidv4(),
        name: `Заказ${rows.length + 1}`,
        cells: new Array(columnNames.length).fill(null).map(el => {
          const randomBool = Math.random() < 0.5;
          return {id: uuidv4(), value: randomBool}
        })
      };

      return {
        columnNames,
        rows: [...rows, nextRow],
      }
    })
  }

  function editRow(row: IRowData) {
    setTableData(({columnNames, rows}) => {

      const newRowsData = rows.map((el) => el.id === row.id ? row : el)

      return {
        columnNames,
        rows: newRowsData,
      }
    })
  }


  function deleteRow(id: string) {
    setDeletedElement(id)
    setModal(true)
  }

  function handleModal(value) {
    value && setTableData(({columnNames, rows}) => {
      const newRows = rows.filter(el => el.id !== deletedElement)
      return {
        columnNames,
        rows: newRows
      }
    })

    setDeletedElement("")
    setModal(false)
  }


  useEffect(() => {
    createColumn().then((value) => {
      setLoading(Loading.Row)
      return createTable(value)
    }).then((value) => {
      setLoading(Loading.All)
      setTableData(value)
    })
  }, [])

  return (
      loading === Loading.Column ? <p className="loading"> генерация столбцов.. </p> :
          loading === Loading.Row ? <p className="loading"> генерация строк.. </p> :
              <TableContext.Provider value={{tableData, deleteRow, editRow}}>
                <div className="App">
                  <Table/>
                  <button className="addRow" onClick={addRow}> Добавить строку</button>
                  {modal && createPortal(
                      <ModalDelete handleNodal={handleModal}/>,
                      document.body
                  )}
                </div>
              </TableContext.Provider>
  );
}

export default memo(App);

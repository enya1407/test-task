import {memo} from "react";
import {ICellData, IRowData} from "../../../../Types/types";
import styles from "./Cell.module.css";

type TSetRowCallback = (rowData: IRowData) => IRowData

function Cell({ cell, changeMode, setCurrData}: { cell: ICellData, changeMode: boolean, setCurrData: (cb: TSetRowCallback) => void }) {

  function changeCell() {
    setCurrData(({name, cells, id}) => {
      const newCells = cells.map(el => el.id === cell.id ? {id: el.id, value: !el.value} : el)
      return {
        id, name, cells: newCells
      }
    })
  }

  const cellStyle = cell.value ? styles.trueCell : styles.falseCell

  return (
      changeMode ? <td className={cellStyle} style={{cursor: "pointer"}} onClick={changeCell}/> :
          <td className={cellStyle}/>
  )
}

export default memo(Cell);

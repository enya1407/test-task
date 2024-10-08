import {memo, useContext, useState} from "react";
import styles from "./Row.module.css";
import {TableContext} from "../../../App";
import Cell from "./Cell/Cell";
import {getNotNil} from "../../../Functions/utils";

function Row({id}: { id: string }) {
  const {tableData, deleteRow, editRow} = useContext(TableContext);
  const rowData = getNotNil(tableData.rows.find((el) => el.id === id), "rowData")

  const [changeMode, setChangeMode] = useState(false)
  const [currData, setCurrData] = useState(rowData)

  function saveString() {
    editRow(currData)
    setChangeMode(false)
  }

  function cancelString() {
    setCurrData(rowData)
    setChangeMode(false)
  }

  function changeName(value: string) {
    setCurrData(({cells, id}) => {
      return {
        cells, id, name: value
      }
    })
  }

  return (
      <tr key={currData.id} className={changeMode ? styles.editRow : undefined}>
        <th>
          {
            changeMode
                ? <input autoFocus={true} className={styles.input} value={currData.name} onChange={(e) => changeName(e.target.value)}/>
                : <p>{currData.name}</p>
          }
        </th>

        {currData.cells.map((el) => <Cell key={el.id} cell={el} changeMode={changeMode} setCurrData={setCurrData}/>)}

        <td>
          <div>
            {
              changeMode
                  ? (
                      <div className={styles.changeMode}>
                        <button onClick={saveString}>save</button>
                        <button onClick={cancelString}>cancel</button>
                      </div>
                  )
                  : <button className={styles.editButton} onClick={() => setChangeMode(true)}>edit</button>
            }
            <button className={styles.delete} onClick={() => deleteRow(currData.id)}>delete</button>
          </div>
        </td>
      </tr>
  );
}

export default memo(Row);

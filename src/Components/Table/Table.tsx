import {memo, useContext} from "react";
import styles from "./Table.module.css";
import {TableContext} from "../../App";
import Row from "./Row/Row";

function Table() {
  const {tableData} = useContext(TableContext);

  return (
      <table className={styles.table} >
        <thead>
        <tr>
          <th/>
          {tableData.columnNames.map((el) => {
            return <th className={styles.collName} key={el.id}><p>{el.name}</p></th>
          })}
        </tr>
        </thead>
        <tbody>{tableData.rows.map(el => <Row key={el.id} id={el.id}/>)}</tbody>
      </table>
  );
}

export default memo(Table);

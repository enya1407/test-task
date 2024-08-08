import {memo} from "react";
import styles from "./ModalDelete.module.css";

function ModalDelete({handleNodal}) {

  return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3>Вы уверены, что хотите удалить?</h3>
          </div>
          <div className={styles.body}>
            <button onClick={() => handleNodal(true)}>да</button>
            <button onClick={() => handleNodal(false)}>нет</button>
          </div>
        </div>
      </div>
  )
}

export default memo(ModalDelete);

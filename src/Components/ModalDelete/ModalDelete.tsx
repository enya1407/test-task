import {memo} from "react";
import styles from "./ModalDelete.module.css";

function ModalDelete({handleModal}: {handleModal: (visible: boolean) => void}) {

  return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3>Вы уверены, что хотите удалить?</h3>
          </div>
          <div className={styles.body}>
            <button onClick={() => handleModal(true)}>да</button>
            <button onClick={() => handleModal(false)}>нет</button>
          </div>
        </div>
      </div>
  )
}

export default memo(ModalDelete);

import styles from "../styles/Toast.module.scss";
interface Props {
  message: string;
  handleButtonClick: () => void;
}
export default function Toast({ message, handleButtonClick }: Props) {
  return (
    <div className={`${styles.toastHolder} ${message ? styles.active : ""}`}>
      <div className={styles.toast}>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
        <div className={styles.buttonRow}>
          <div className={styles.button} onClick={handleButtonClick}>
            &times;
          </div>
        </div>
      </div>
    </div>
  );
}

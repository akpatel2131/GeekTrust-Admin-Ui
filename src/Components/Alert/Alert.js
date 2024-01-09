import React from "react";
import { FadeLoader } from "react-spinners";
import styles from "./alert.module.css";
import clsx from "clsx";

const Alert = ({ type, message }) => {
  return (
    <>
      <div className={styles.alertContainer}>
        {type === "loading" && (
          <div className={styles.alertLoadingWrapper}>
            <FadeLoader color="#808080" />
            <p className={styles.alertText}>{message} </p>
          </div>
        )}
        {type === "error" && (
          <p className={clsx(styles.alertText, styles.error)}>
            Something went wrong : {message}
          </p>
        )}
        {type === "notFound" && (
          <p className={styles.alertText}>{message} </p>
        )}
      </div>
    </>
  );
};

export default Alert;
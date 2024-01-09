import React from "react";
import styles from "./header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.heading}>GeekTrust - Admin UI Challenge</span>
    </div>
  );
};

export default Header;
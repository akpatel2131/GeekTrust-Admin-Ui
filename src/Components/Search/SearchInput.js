import React from "react";
import styles from "./searchInput.module.css"

const SearchInput = ({ searchedQuery, handleSearchedQueryText }) => {
  return (
    <div className={styles.searchInputWrapper}>
      <input
        className={styles.searchInput}
        type="text"
        defaultValue={searchedQuery}
        onChange={(e) => handleSearchedQueryText(e.target.value)}
        placeholder="Search by Name, Email, Role"
      />
    </div>
  );
};

export default SearchInput;
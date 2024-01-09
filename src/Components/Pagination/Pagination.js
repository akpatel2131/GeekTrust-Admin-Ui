import React, {useState, useEffect} from "react";
import styles from "./pagination.module.css";
import clsx from "clsx";

const Pagination = ({ totalRowsPerPage, totalNumberOfRows, pageRedirect, currentPage }) => {

    const [pageNumber, setPageNumber] =  useState([]);

    const pageValue = Math.ceil(totalNumberOfRows / totalRowsPerPage);
    const disabled = currentPage === pageValue || pageValue === 0;
    
    useEffect(()=>{ 
        const TotalNumber = [];
        for (let i = 1; i <= pageValue; i++) {
            TotalNumber.push(i);
        }
        
        if (pageValue === 0) {
            TotalNumber.push(1);
        }

        setPageNumber(TotalNumber)
    },[pageValue, totalNumberOfRows, totalRowsPerPage])


  return (
    <nav className={styles.paginationWrapperContainer}>
      <div className={styles.pagination}>
        <div>
          <button
            disabled={currentPage === 1}
            className={styles.pageSkipButton}
            onClick={() => pageRedirect(1)}
          >
            {`<<`}
          </button>
        </div>
        <div>
          <button
            disabled={currentPage === 1}
            className={styles.pageSkipButton}
            onClick={() => pageRedirect(currentPage - 1)}
          >
            {`<`}
          </button>
        </div>
        {pageNumber.map((number) => (
          <div key={number}>
            <button
              onClick={() => pageRedirect(number)}
              className={
                currentPage === number ? clsx(styles.paginationButton, styles.active) : styles.paginationButton
              }
            >
              {number}
            </button>
          </div>
        ))}
        <div>
          <button
            disabled={disabled}
            className={styles.pageSkipButton}
            onClick={() => pageRedirect(currentPage + 1)}
          >
            {`>`}
          </button>
        </div>
        <div>
          <button
            disabled={disabled}
            className={styles.pageSkipButton}
            onClick={() => pageRedirect(pageValue)}
          >
            {`>>`}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;

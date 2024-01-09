import React from "react";
import { useEffect } from "react";
import TableRow from "./TableRow";
import styles from "./table.module.css";
import Alert from "../Alert/Alert";
import clsx from "clsx";

const Table = ({
  handleUpdatedRow,
  filterDataList,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  selectedRowsList,
  handleSelectedRows,
  handleDeletedRows,
  handleAllRowsSelect,
  showEditModal,
  setShowEditModal,
}) => {

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const activeRows = filterDataList?.slice(firstRowIndex, lastRowIndex);

  useEffect(() => {
    if (activeRows?.length === 0 && currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  }, [activeRows, currentPage, setCurrentPage]);

  return (
    <div>
      <div
        className={clsx(styles.tableWrapper, {
            [styles.empty]: activeRows?.length === 0
        })}
      >
        <table className={styles.table}>
          <thead>
            <tr role="row">
              <th>
                <input
                  type="checkbox"
                  checked={
                    activeRows?.length > 0 &&
                    activeRows?.every((row) => selectedRowsList.includes(row))
                  }
                  onChange={() => handleAllRowsSelect(activeRows)}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeRows?.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  selectedRowsList={selectedRowsList}
                  handleSelectedRows={handleSelectedRows}
                  handleDeletedRows={handleDeletedRows}
                  showEditModal={showEditModal}
                  handleUpdatedRow={handleUpdatedRow}
                  setShowEditModal={setShowEditModal}
                  userData={user}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {activeRows?.length === 0 && (
        <Alert type={"notFound"} message="No data found" />
      )}
    </div>
  );
};

export default Table;

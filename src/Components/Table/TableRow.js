import React, { useState } from "react";
import { FiTrash, FiEdit, FiSave } from "react-icons/fi";
import styles from "./tableRow.module.css";
import clsx from "clsx";

const TableRow = ({
  userData,
  selectedRowsList,
  handleSelectedRows,
  handleDeletedRows,
  showEditModal,
  setShowEditModal,
  handleUpdatedRow,
}) => {
  const [updatedUserData, setUpdatedUserData] = useState({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  });

  return (
    <tr
      role="row"
      className={clsx(styles.tableRow, {
        [styles.selected]: selectedRowsList?.includes(userData),
      })}
    >
      <td>
        <input
          data-testid="select-row-checkBox"
          type="checkbox"
          checked={selectedRowsList?.includes(userData) ? true : false}
          onChange={() => handleSelectedRows(userData)}
        />
      </td>

      {showEditModal?.isModalOpen &&
      showEditModal?.user.id === userData.id ? (
        <>
          <td>
            <input
              className={styles.tableRowInput}
              type="text"
              defaultValue={userData.name}
              onChange={(e) =>
                setUpdatedUserData({
                  ...updatedUserData,
                  name: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className={styles.tableRowInput}
              type="text"
              defaultValue={userData.email}
              onChange={(e) =>
                setUpdatedUserData({
                  ...updatedUserData,
                  email: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className={styles.tableRowInput}
              type="text"
              defaultValue={userData.role}
              onChange={(e) =>
                setUpdatedUserData({
                  ...updatedUserData,
                  role: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{userData.name}</td>
          <td>{userData.email}</td>
          <td>{userData.role}</td>
        </>
      )}

      <td>
        <div className={styles.tableRowActionButton}>
          {showEditModal?.isModalOpen &&
          showEditModal?.user?.id === userData.id ? (
            <span
              className={styles.tableRowButton}
              onClick={() => {
                handleUpdatedRow(updatedUserData);
              }}
              role="button"
            >
              <FiSave className={clsx(styles.icon, styles.iconSave)} />
            </span>
          ) : (
            <>
              <span
                className={styles.tableRowButton}
                onClick={() => {
                  setShowEditModal({
                    isModalOpen: true,
                    user: userData,
                  });
                }}
                role="button"
                data-testid="edit-row-button"
              >
                <FiEdit className={styles.icon} />
              </span>
              <span
                className={styles.tableRowButton}
                role="button"
                data-testid="delete-row-button"
                onClick={() => handleDeletedRows(userData)}
              >
                <FiTrash className={clsx(styles.icon, styles.iconDelete)} />
              </span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;

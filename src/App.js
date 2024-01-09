import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import Header  from "./Components/Header/Header";
import SearchInput from "./Components/Search/SearchInput";
import Pagination from "./Components/Pagination/Pagination";
import filterData from "./Utils/FilterData";
import Table from "./Components/Table/Table";
import Alert from "./Components/Alert/Alert";

const App = () => {
  const [userData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState({
    isOpen: false,
    user: {},
  });
  
  const rowsPerPage = 10;
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const result = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const response = await result.json();
      setUsersData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearchedQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filterDataList = searchQuery ? filterData(userData, searchQuery) : userData;

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((user) => user.id !== row.id)
        : [...prevSelectedRows, row]
    );
  };

  const handleAllSelectedRows = (currentRows) => {
    setSelectedRows(
      currentRows.every((row) => selectedRows.includes(row))
        ? selectedRows.filter((row) => !currentRows.includes(row))
        : [...selectedRows, ...currentRows.filter((row) => !selectedRows.includes(row))]
    );
  };

  const handleDeleteRow = (row) => {
    const data = userData.filter((user) => user.id !== row.id);
    const updatedSelectedRows = selectedRows.filter((user) => user.id !== row.id);

    setSelectedRows(updatedSelectedRows);
    setUsersData(data);
  };

  const deleteSelected = () => {
    const data = userData.filter((user) => !selectedRows.includes(user));

    setSelectedRows([]);
    setUsersData(data);
  };

  const updateRowModal = (row) => {
    setShowEditModal({ isOpen: false, user: {} });
    setUsersData(userData.map((user) => (user?.id === row?.id ? row : user)));
  };

  return (
    <div className={styles.appContainer}>
      <Header />
      <SearchInput searchedQuery={searchQuery} handleSearchedQueryText={handleSearchedQuery} />

      {loading || error ? (
        <Alert type={loading ? 'loading' : 'error'} message={loading ? 'Loading...' : error.message} />
      ) : (
          <Table
            handleUpdatedRow={updateRowModal}
            filterDataList={filterDataList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            selectedRowsList={selectedRows}
            handleSelectedRows={handleRowSelect}
            handleDeletedRows={handleDeleteRow}
            handleAllRowsSelect={handleAllSelectedRows}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
          />
        )}

      <div className={styles.deleteActionContainer}>
           <button
            className={styles.deleteBtn}
            onClick={() => deleteSelected()}
            disabled={selectedRows.length > 0 ? false : true}
          >
            Delete Selected
          </button>
        <Pagination totalRowsPerPage={rowsPerPage} totalNumberOfRows={filterDataList.length} pageRedirect={pagination} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default App;


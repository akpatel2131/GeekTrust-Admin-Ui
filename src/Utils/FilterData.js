
function filterData(data, query) {
  const lowerCaseQuery = query.toLowerCase();
  return data.filter(({ name, email, role }) =>
    [name, email, role].some((field) => field.toLowerCase().includes(lowerCaseQuery))
  );
}

export default filterData;
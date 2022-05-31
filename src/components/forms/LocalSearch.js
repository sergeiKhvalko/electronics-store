const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      className="form-control mb-4"
      onChange={handleSearchChange}
      value={keyword}
      placeholder="Filter"
    />
  );
};

export default LocalSearch;

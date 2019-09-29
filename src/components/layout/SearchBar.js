import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";

const SearchBar = ({ searchLogs }) => {
  const text = useRef("");

  const onChange = () => {
    searchLogs(text.current.value);
  };

  const clearSearch = () => {
    text.current.value = "";
    onChange();
  };

  return (
    <nav style={{ marginBottom: "30px " }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Поиск записей...'
              ref={text}
              onChange={onChange}
              required
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i
              style={{ cursor: "pointer" }}
              onClick={clearSearch}
              className='material-icons'
            >
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchLogs }
)(SearchBar);

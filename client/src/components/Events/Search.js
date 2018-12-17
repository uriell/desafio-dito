import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, AutoComplete } from 'antd';
import './search.css';

const inputStyle = { height: '40px' };

const EventsSearch = ({
  onSearch, onSubmit, onClear, isLoading, keys,
}) => {
  function lengthValidation(func, length) {
    return (value) => {
      if (value.length >= length) func(value);
      else onClear();
    };
  }

  onSearch = lengthValidation(onSearch, 2);
  onSubmit = lengthValidation(onSubmit, 2);

  return (
    <AutoComplete
      autoFocus
      className="Search"
      dataSource={keys}
      onSearch={onSearch}
      onSelect={onSubmit}
    >
      <Input.Search
        className="Search-SearchInput"
        placeholder="Busque um evento"
        enterButton="Buscar"
        size="large"
        style={inputStyle}
        onSearch={onSubmit}
        onPressEnter={onSubmit}
        prefix={(
          <Icon className="Search-SearchIcon" type={isLoading ? 'loading' : 'search'} />
        )}
      />
    </AutoComplete>
  );
};

EventsSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  keys: PropTypes.array.isRequired,
};

export default EventsSearch;
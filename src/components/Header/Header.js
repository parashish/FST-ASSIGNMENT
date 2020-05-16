import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

const Header = (props) => {
  const {
    selected,
    onRemoveItem,
    onSearch,
    nameFilterOptions,
    onChangeObject,
  } = props;

  const { species, gender, origin, names } = selected;
  const speciesArrayWithType = species.map((item) => {
    return { name: item, filtertType: 'selectedSpecies' };
  });
  const namesArrayWithType = names.map((item) => {
    return { name: item, filtertType: 'selectedNames' };
  });
  const originArrayWithType = origin.map((item) => {
    return { name: item, filtertType: 'selectedOrigin' };
  });
  const genderArrayWithType = gender.map((item) => {
    return { name: item, filtertType: 'selectedGender' };
  });
  const allSelected = [
    ...speciesArrayWithType,
    ...namesArrayWithType,
    ...originArrayWithType,
    ...genderArrayWithType,
  ];

  return (
    <React.Fragment>
      <div className="selected-filters">
        {' '}
        <h3>Selected Filters</h3>
      </div>
      {allSelected.length > 0 && (
        <div className="selected-filters-wrapper">
          {allSelected.map((item) => {
            return (
              <div
                key={`${item.name}-${item.filtertType}`}
                className="selected-item"
              >
                <span>{item.name}</span>
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={() => onRemoveItem(item.name, item.filtertType)}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="search-sort-filter-wrapper">
        <div className="multi-select-container">
          <div className="search-container">
            <input
              className="search-by-name"
              placeholder="Search by Name"
              value={nameFilterOptions}
              name="nameFilterOptions"
              onChange={(e) => onChangeObject(e)}
              type="search"
              aria-label="Search by character first name or last name"
            />
            <button
              type="button"
              aria-label="Search"
              className="search-button"
              name="selectedNames"
              onClick={(e) => onSearch(e)}
            >
              Search
            </button>
          </div>
        </div>
        <div className="sort-id-container">
          <select
            name="sortById"
            aria-label="Sort character list"
            onChange={(e) => onChangeObject(e)}
          >
            <option disabled>Sort by ID</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <i className="fa fa-chevron-down" aria-hidden="true" />
        </div>
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  selected: PropTypes.object.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  nameFilterOptions: PropTypes.string.isRequired,
  onChangeObject: PropTypes.func.isRequired,
};

export default Header;

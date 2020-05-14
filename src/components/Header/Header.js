import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <React.Fragment>
      <div className="row selected-filters">
        <div className="col-12">
          {' '}
          <h3>Selected Filters</h3>{' '}
        </div>
        <div className="col-12 row">
          {props.selected.names.length > 0 && (
            <React.Fragment>
              {props.selected.names.map((name, idx) => {
                return (
                  <div key={idx} className="col-sm-2 col-xs-4 item">
                    <span>{name} </span>
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                      onClick={() => props.onRemoveItem(name)}
                    ></i>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-9 row">
          <div className="form-group col-sm-4 multi-select-container">
            Search by Name
            <input
              className="form-control search-by-name"
              type="text"
              placeholder="Search by Name"
              value={props.nameFilterOptions}
              name="nameFilterOptions"
              onChange={(e) => props.onChangeObject(e)}
            />
            <div className="multi-option-container">
              {props.filterOptions.names
                .filter((name) => {
                  return name.toLowerCase().includes(props.nameFilterOptions);
                })
                .map((name, idx) => {
                  return (
                    <div key={idx} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="selectedNames"
                        checked={props.selected.names.indexOf(name) !== -1}
                        value={name}
                        onChange={(e) => props.onChangeCheckboxObject(e)}
                      />
                      <label className="form-check-label"> {name} </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="form-group sort-id-container">
            Sort by ID
            <select
              className="form-control"
              name="sortById"
              onChange={(e) => props.onChangeObject(e)}
            >
              <option disabled>Sort by ID</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;

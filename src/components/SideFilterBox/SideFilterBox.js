import React from 'react';
import './SideFilterBox.css';

import PropTypes from 'prop-types';

const SideFilterBox = (props) => {
  const { name, filteroptions, selectedFilters, onChange, inputName } = props;
  return (
    <div className="side-filter-box">
      <h4>{name}</h4>
      {filteroptions.map((item) => {
        return (
          <div key={`${item}-${name}-key`} className="form-check">
            <input
              id={`${item}-${name}`}
              type="checkbox"
              checked={selectedFilters.indexOf(item) !== -1}
              className="form-check-input"
              name={inputName}
              value={item}
              onChange={(e) => onChange(e)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label
              aria-label={name}
              className="form-check-label"
              htmlFor={`${item}-${name}`}
            >
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
};

SideFilterBox.propTypes = {
  name: PropTypes.string.isRequired,
  filteroptions: PropTypes.array.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SideFilterBox;

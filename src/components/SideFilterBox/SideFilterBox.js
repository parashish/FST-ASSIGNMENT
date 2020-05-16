import React from 'react';
import './SideFilterBox.css';

const SideFilterBox = (props) => {
  const { name, filteroptions, selectedFilters, onChange, inputName } = props;
  return (
    <div className="side-filter-box">
      <h4>{name}</h4>
      {filteroptions.map((item, idx) => {
        return (
          <div key={idx} className="form-check">
            <input
              id={`${item}-${name}`}
              type="checkbox"
              checked={selectedFilters.indexOf(item) !== -1}
              className="form-check-input"
              name={inputName}
              value={item}
              onChange={(e) => onChange(e)}
            />
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

export default SideFilterBox;

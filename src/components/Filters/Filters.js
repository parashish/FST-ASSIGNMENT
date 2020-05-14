import React from 'react';
import './Filter.css';

const Filters = (props) => {
  return (
    <React.Fragment>
      <div className="filter-header">
        <h3>
          Filters
          {props.screenSize.width < 768 ? (
            <i
              className="fa fa-plus-circle"
              title="Show/Hide Filters"
              aria-hidden="true"
              onClick={() => props.onClickShowFilters()}
            ></i>
          ) : null}
        </h3>
      </div>

      {(props.screenSize.width >= 768 || props.showFiltersOnMobile) && (
        <React.Fragment>
          <div className="col-12 side-filter-box">
            <h4>Species</h4>
            {props.filterOptions.species.map((species, idx) => {
              return (
                <div key={idx} className="form-check">
                  <input
                    type="checkbox"
                    checked={props.selected.species.indexOf(species) !== -1}
                    className="form-check-input"
                    name="selectedSpecies"
                    value={species}
                    onChange={(e) => props.onChangeCheckboxObject(e)}
                  />
                  <label className="form-check-label"> {species} </label>
                </div>
              );
            })}
          </div>

          <div className="col-12 side-filter-box">
            <h4>Gender</h4>
            {props.filterOptions.gender.map((gender, idx) => {
              return (
                <div key={idx} className="form-check">
                  <input
                    type="checkbox"
                    checked={props.selected.gender.indexOf(gender) !== -1}
                    className="form-check-input"
                    name="selectedGender"
                    value={gender}
                    onChange={(e) => props.onChangeCheckboxObject(e)}
                  />
                  <label className="form-check-label"> {gender} </label>
                </div>
              );
            })}
          </div>

          <div className="col-12 side-filter-box">
            <h4>Origin</h4>
            {props.filterOptions.origin.map((origin, idx) => {
              return (
                <div key={idx} className="form-check">
                  <input
                    type="checkbox"
                    checked={props.selected.origin.indexOf(origin) !== -1}
                    className="form-check-input"
                    name="selectedOrigin"
                    value={origin}
                    onChange={(e) => props.onChangeCheckboxObject(e)}
                  />
                  <label className="form-check-label"> {origin} </label>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Filters;

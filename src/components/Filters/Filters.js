import React from 'react';
import './Filter.css';
import PropTypes from 'prop-types';
import SideFilterBox from '../SideFilterBox/SideFilterBox';

const Filters = (props) => {
  const {
    onClickShowFilters,
    showFiltersOnMobile,
    screenSize,
    filterOptions,
    selected,
    onChangeCheckboxObject,
  } = props;

  const { species, gender, origin } = selected;
  const {
    gender: genderFilters,
    origin: originFilters,
    species: speciesFilters,
  } = filterOptions;
  return (
    <React.Fragment>
      <div className="filter-header">
        <h3>Filters</h3>
        {screenSize.width < 768 ? (
          <i
            className="fa fa-plus-circle"
            title="Show/Hide Filters"
            aria-hidden="true"
            onClick={() => onClickShowFilters()}
          />
        ) : null}
      </div>

      {(screenSize.width >= 768 || showFiltersOnMobile) && (
        <React.Fragment>
          <SideFilterBox
            name="Species"
            filteroptions={speciesFilters}
            selectedFilters={species}
            onChange={onChangeCheckboxObject}
            inputName="selectedSpecies"
          />
          <SideFilterBox
            name="Gender"
            filteroptions={genderFilters}
            selectedFilters={gender}
            onChange={onChangeCheckboxObject}
            inputName="selectedGender"
          />
          <SideFilterBox
            name="Origin"
            filteroptions={originFilters}
            selectedFilters={origin}
            onChange={onChangeCheckboxObject}
            inputName="selectedOrigin"
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Filters.propTypes = {
  onClickShowFilters: PropTypes.func.isRequired,
  showFiltersOnMobile: PropTypes.bool.isRequired,
  screenSize: PropTypes.object.isRequired,
  filterOptions: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  onChangeCheckboxObject: PropTypes.func.isRequired,
};

export default Filters;

import React from 'react';
import './Filter.css';
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
          ></i>
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
          ></SideFilterBox>
          <SideFilterBox
            name="Gender"
            filteroptions={genderFilters}
            selectedFilters={gender}
            onChange={onChangeCheckboxObject}
            inputName="selectedGender"
          ></SideFilterBox>
          <SideFilterBox
            name="Origin"
            filteroptions={originFilters}
            selectedFilters={origin}
            onChange={onChangeCheckboxObject}
            inputName="selectedOrigin"
          ></SideFilterBox>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Filters;

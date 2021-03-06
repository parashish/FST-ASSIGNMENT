import React from 'react';
import './MainApp.css';
import axios from 'axios';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import CharacterList from '../CharacterList/CharacterList';
import Loader from '../../assets/icons/loader-animation.gif';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      sortById: 'asc',
      width: 0,
      height: 0,
      showFiltersOnMobile: false,
      showOnlyLoader: true,
      filterOptions: {
        species: [],
        gender: [],
        origin: [],
        names: [],
      },
      selectedSpecies: [],
      selectedGender: [],
      selectedOrigin: [],
      selectedNames: [],
      nameFilterOptions: '',
    };
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount() {
    this.getCharacterDetails();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  /**
   * @param {HTMLElement} -
   * @description - Search functionality on the basis of name
   */
  onSearch = (e) => {
    const newState = this.state;
    if (
      // eslint-disable-next-line react/destructuring-assignment
      this.state[e.target.name].indexOf(e.target.previousSibling.value) ===
        -1 &&
      e.target.previousSibling.value.length > 3
    ) {
      newState[e.target.name].push(e.target.previousSibling.value);
    }
    this.setState(newState);
  };

  /**
   * @description - API call to get character list and set result in component state
   */
  getCharacterDetails = () => {
    axios.get(`https://rickandmortyapi.com/api/character`).then((response) => {
      const newState = this.state;
      const { results } = response.data;
      newState.characters = response.data.results;
      newState.showOnlyLoader = false;
      newState.filterOptions.species = results
        .map((character) => {
          return character.species;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.gender = results
        .map((character) => {
          return character.gender;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.origin = results
        .map((character) => {
          return character.origin.name;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.names = results
        .map((character) => {
          return character.name;
        })
        .filter(this.onlyUnique);
      this.setState(newState);
    });
  };

  /**
   * @description - show filter in mobile
   */
  onClickShowFilters = () => {
    const { showFiltersOnMobile } = this.state;
    this.setState({ showFiltersOnMobile: !showFiltersOnMobile });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  /**
   * @param {HTMLElement}
   * @description - on change handler
   */
  onChangeObject = (e) => {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  /**
   * @param {HTMLElement}
   * @description - on change handler
   */
  onChangeCheckboxObject = (e) => {
    const newState = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state[e.target.name].indexOf(e.target.value) === -1) {
      newState[e.target.name].push(e.target.value);
    } else {
      newState[e.target.name].splice(
        // eslint-disable-next-line react/destructuring-assignment
        this.state[e.target.name].indexOf(e.target.value),
        1,
      );
    }
    this.setState(newState);
  };

  /**
   * @param {String} - Filter Name
   * @param {String} - Type of filter
   * @description - Remove selected filter from the list
   */
  onRemoveItem = (name, type) => {
    const newState = this.state;
    switch (type) {
      case 'selectedSpecies':
        newState.selectedSpecies.splice(
          newState.selectedSpecies.indexOf(name),
          1,
        );
        break;
      case 'selectedGender':
        newState.selectedGender.splice(
          newState.selectedGender.indexOf(name),
          1,
        );
        break;
      case 'selectedOrigin':
        newState.selectedOrigin.splice(
          newState.selectedOrigin.indexOf(name),
          1,
        );
        break;
      case 'selectedNames':
        newState.selectedNames.splice(newState.selectedNames.indexOf(name), 1);
        break;
      default:
    }
    this.setState(newState);
  };

  /**
   * @description - show filter in mobile
   */
  onClickShowFilters = () => {
    const { showFiltersOnMobile } = this.state;
    this.setState({ showFiltersOnMobile: !showFiltersOnMobile });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  /**
   * @param {HTMLElement}
   * @description - on change handler
   */
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    const {
      showOnlyLoader,
      selectedSpecies,
      selectedGender,
      selectedOrigin,
      filterOptions,
      height,
      width,
      showFiltersOnMobile,
      selectedNames,
      sortById,
      nameFilterOptions,
      characters,
    } = this.state;
    return showOnlyLoader ? (
      <img className="whole-loader" src={Loader} alt="Loading..." />
    ) : (
      <React.Fragment>
        <div className="heading">
          <h1>Rick Morty Cartoon List</h1>
        </div>
        <div className="main-wrapper" role="main">
          <div className="filter-section">
            <Filters
              selected={{
                species: selectedSpecies,
                gender: selectedGender,
                origin: selectedOrigin,
              }}
              onChangeCheckboxObject={this.onChangeCheckboxObject}
              filterOptions={filterOptions}
              onClickShowFilters={this.onClickShowFilters}
              screenSize={{
                height,
                width,
              }}
              showFiltersOnMobile={showFiltersOnMobile}
              onChangeObject={this.onChangeObject}
            />
          </div>
          <div className="main-section">
            {(width >= 768 || showFiltersOnMobile) && (
              <Header
                onRemoveItem={this.onRemoveItem}
                onChangeCheckboxObject={this.onChangeCheckboxObject}
                selected={{
                  species: selectedSpecies,
                  gender: selectedGender,
                  origin: selectedOrigin,
                  names: selectedNames,
                }}
                filterOptions={filterOptions}
                sortById={sortById}
                onChangeObject={this.onChangeObject}
                onSearch={this.onSearch}
                nameFilterOptions={nameFilterOptions}
              />
            )}
            <div className="cards">
              {characters
                .filter((character) => {
                  return (
                    (selectedSpecies.length === 0 ||
                      selectedSpecies.indexOf(character.species) !== -1) &&
                    (selectedGender.length === 0 ||
                      selectedGender.indexOf(character.gender) !== -1) &&
                    (selectedOrigin.length === 0 ||
                      selectedOrigin.indexOf(character.origin.name) !== -1) &&
                    (selectedNames.length === 0 ||
                      selectedNames.indexOf(character.name.split(' ')[0]) !==
                        -1 ||
                      selectedNames.indexOf(character.name.split(' ')[1]) !==
                        -1 ||
                      selectedNames.indexOf(character.name) !== -1)
                  );
                })
                .sort((a, b) => {
                  if (sortById === 'asc' && a.id > b.id) return 1;
                  return -1;
                })
                .map((character) => {
                  return (
                    <CharacterList key={character.id} character={character} />
                  );
                })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainApp;

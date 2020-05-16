import React from 'react';
import './MainApp.css';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import CharacterList from '../CharacterList/CharacterList';
import axios from 'axios';
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

  render() {
    return this.state.showOnlyLoader ? (
      <img className="whole-loader" src={Loader} alt="Loading..." />
    ) : (
      <div className="main-wrapper">
        <div className="filter-section">
          <Filters
            selected={{
              species: this.state.selectedSpecies,
              gender: this.state.selectedGender,
              origin: this.state.selectedOrigin,
            }}
            onChangeCheckboxObject={this.onChangeCheckboxObject}
            filterOptions={this.state.filterOptions}
            onClickShowFilters={this.onClickShowFilters}
            screenSize={{ height: this.state.height, width: this.state.width }}
            showFiltersOnMobile={this.state.showFiltersOnMobile}
            onChangeObject={this.onChangeObject}
          />
        </div>
        <div className="main-section">
          {(this.state.width >= 768 || this.state.showFiltersOnMobile) && (
            <Header
              onRemoveItem={this.onRemoveItem}
              onChangeCheckboxObject={this.onChangeCheckboxObject}
              selected={{
                species: this.state.selectedSpecies,
                gender: this.state.selectedGender,
                origin: this.state.selectedOrigin,
                names: this.state.selectedNames,
              }}
              filterOptions={this.state.filterOptions}
              sortById={this.state.sortById}
              onChangeObject={this.onChangeObject}
              onSearch={this.onSearch}
              nameFilterOptions={this.state.nameFilterOptions}
            />
          )}
          <div className="cards">
            {this.state.characters
              .filter((character) => {
                return (
                  (this.state.selectedSpecies.length === 0 ||
                    this.state.selectedSpecies.indexOf(character.species) !==
                      -1) &&
                  (this.state.selectedGender.length === 0 ||
                    this.state.selectedGender.indexOf(character.gender) !==
                      -1) &&
                  (this.state.selectedOrigin.length === 0 ||
                    this.state.selectedOrigin.indexOf(character.origin.name) !==
                      -1) &&
                  (this.state.selectedNames.length === 0 ||
                    this.state.selectedNames.indexOf(
                      character.name.split(' ')[0],
                    ) !== -1 ||
                    this.state.selectedNames.indexOf(
                      character.name.split(' ')[1],
                    ) !== -1 ||
                    this.state.selectedNames.indexOf(character.name) !== -1)
                );
              })
              .sort((a, b) => {
                if (this.state.sortById === 'asc' && a.id > b.id) return 1;
                else return -1;
              })
              .map((character, idx) => {
                return <CharacterList key={idx} character={character} />;
              })}
          </div>
        </div>
      </div>
    );
  }

  /**
   * @description - API call to get character list and set result in component state
   */
  getCharacterDetails = () => {
    axios.get(`https://rickandmortyapi.com/api/character`).then((response) => {
      let newState = this.state;
      const results = response.data.results;
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
   * @param {HTMLElement}
   * @description - on change handler
   */
  onChangeObject = (e) => {
    let newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  /**
   * @param {HTMLElement}
   * @description - on change handler
   */
  onChangeCheckboxObject = (e) => {
    let newState = this.state;
    if (this.state[e.target.name].indexOf(e.target.value) === -1) {
      newState[e.target.name].push(e.target.value);
    } else {
      newState[e.target.name].splice(
        this.state[e.target.name].indexOf(e.target.value),
        1,
      );
    }
    this.setState(newState);
  };

  /**
   * @param {HTMLElement}
   * @description - on change handler
   */
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  /**
   * @description - show filter in mobile
   */
  onClickShowFilters = () => {
    this.setState({ showFiltersOnMobile: !this.state.showFiltersOnMobile });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  /**
   * @param {String} - Filter Name
   * @param {String} - Type of filter
   * @description - Remove selected filter from the list
   */
  onRemoveItem = (name, type) => {
    let newState = this.state;
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
      default: {
      }
    }
    this.setState(newState);
  };
  /**
   * @param {HTMLElement} -
   * @description - Search functionality on the basis of name
   */
  onSearch = (e) => {
    let newState = this.state;
    if (
      this.state[e.target.name].indexOf(e.target.previousSibling.value) ===
        -1 &&
      e.target.previousSibling.value.length > 3
    ) {
      newState[e.target.name].push(e.target.previousSibling.value);
    }
    this.setState(newState);
  };
}

export default MainApp;

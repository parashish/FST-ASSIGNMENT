import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import CharacterList from './components/CharacterList/CharacterList';
import axios from 'axios';
import Loader from './assets/icons/loader-animation.gif';

class App extends React.Component {
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
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillMount() {
    this.getCharacterDetails();
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return this.state.showOnlyLoader ? (
      <img className="whole-loader" src={Loader} alt="Loading..." />
    ) : (
      <div className="App container row">
        <div className="filter-section col-sm-3 col-xs-12 row">
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

        <div className="col-sm-9 col-xs-12 header-main">
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
              nameFilterOptions={this.state.nameFilterOptions}
            />
          )}

          <div className="row character-main">
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

  getCharacterDetails = () => {
    axios.get(`https://rickandmortyapi.com/api/character `).then((response) => {
      let newState = this.state;
      newState.characters = response.data.results;
      newState.showOnlyLoader = false;
      newState.filterOptions.species = response.data.results
        .map((character) => {
          return character.species;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.gender = response.data.results
        .map((character) => {
          return character.gender;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.origin = response.data.results
        .map((character) => {
          return character.origin.name;
        })
        .filter(this.onlyUnique);
      newState.filterOptions.names = response.data.results
        .map((character) => {
          return character.name;
        })
        .filter(this.onlyUnique);
      this.setState(newState);
    });
  };

  onChangeObject = (e) => {
    let newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

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

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onClickShowFilters = () => {
    this.setState({ showFiltersOnMobile: !this.state.showFiltersOnMobile });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  onRemoveItem = (name) => {
    let newState = this.state;
    newState.selectedNames.splice(newState.selectedNames.indexOf(name), 1);
    this.setState(newState);
  };
}

export default App;

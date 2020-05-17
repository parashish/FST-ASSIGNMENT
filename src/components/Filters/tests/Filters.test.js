import React from 'react';
import { shallow } from 'enzyme';
import Filters from '../Filters';

describe('Filters component', () => {
  const props = {
    onClickShowFilters: jest.fn(),
    showFiltersOnMobile: false,
    screenSize: { height: 404, width: 1440 },
    filterOptions: {
      gender: ['Male', 'Female', 'unknown'],
      names: [
        'Rick Sanchez',
        'Morty Smith',
        'Summer Smith',
        'Beth Smith',
        'Jerry Smith',
        'Abadango Cluster Princess',
        'Abradolf Lincler',
        'Adjudicator Rick',
        'Agency Director',
        'Alan Rails',
        'Albert Einstein',
        'Alexander',
        'Alien Googah',
        'Alien Morty',
        'Alien Rick',
        'Amish Cyborg',
        'Annie',
        'Antenna Morty',
        'Antenna Rick',
        'Ants in my Eyes Johnson',
      ],
      origin: [
        'Earth (C-137)',
        'Earth (Replacement Dimension)',
        'Abadango',
        'unknown',
      ],
      species: ['Human', 'Alien'],
    },
    selected: {
      gender: ['Male', 'unknown'],
      species: ['Human'],
      origin: ['Abadango'],
      names: ['Rick'],
    },
    onChangeCheckboxObject: jest.fn(),
  };
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<Filters {...props} />);
    expect(component).toMatchSnapshot();
  });
});

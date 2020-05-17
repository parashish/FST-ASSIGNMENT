import React from 'react';
import { shallow } from 'enzyme';
import SideFilterBox from '../SideFilterBox';

describe('SideFilterBox component', () => {
  const props = {
    name: 'Species',
    filteroptions: ['Alien', 'Humen'],
    selectedFilters: ['Humen'],
    inputName: 'selectedSpecies',
    onChange: jest.fn(),
  };
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<SideFilterBox {...props} />);
    expect(component).toMatchSnapshot();
  });
});

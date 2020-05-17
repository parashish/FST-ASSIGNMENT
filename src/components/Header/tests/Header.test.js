import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Header component', () => {
  const props = {
    selected: {
      gender: ['Male', 'unknown'],
      species: ['Human'],
      origin: ['Abadango'],
      names: ['Rick'],
    },
    onRemoveItem: jest.fn(),
    onSearch: jest.fn(),
    nameFilterOptions: 'Rick',
    onChangeObject: jest.fn(),
  };
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<Header {...props} />);
    expect(component).toMatchSnapshot();
  });
});

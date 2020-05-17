import React from 'react';
import { shallow } from 'enzyme';
import MainApp from '../MainApp';
import axios from 'axios';

jest.mock('axios', () => {
  const response = {
    data: {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
          ],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        },
      ],
    },
  };
  return {
    get: jest.fn(() => Promise.resolve(response)),
  };
});
describe('MainApp component', () => {
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<MainApp />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<MainApp />);
    const instance = component.instance();
    jest.spyOn(instance, 'getCharacterDetails');
    instance.componentDidMount();
    expect(instance.getCharacterDetails).toHaveBeenCalledTimes(1);
  });
});

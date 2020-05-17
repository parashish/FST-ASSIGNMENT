import React from 'react';
import { shallow } from 'enzyme';
import CharacterList from '../CharacterList';

describe('CharacterList component', () => {
  const props = {
    character: {
      created: '2017-11-04T18:48:46.250Z',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3',
      ],
      gender: 'Male',
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      location: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      name: 'Rick Sanchez',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      species: 'Human',
      status: 'Alive',
      type: '',
      url: 'https://rickandmortyapi.com/api/character/1',
    },
  };
  it('should render correctly with props` and match snapshot', () => {
    const component = shallow(<CharacterList {...props} />);
    expect(component).toMatchSnapshot();
  });
});

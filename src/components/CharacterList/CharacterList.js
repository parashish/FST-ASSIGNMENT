import React from 'react';
import './CharacterList.css';

const CharacterList = (props) => {
  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    location,
    created,
  } = props.character;

  const getIdCreationYears = () => {
    return `Created ${
      parseInt(new Date().getFullYear()) -
      parseInt(new Date(created).getFullYear())
    } years ago`;
  };

  return (
    <React.Fragment>
      <div id="id" className="card">
        <img src={image} alt={name} />
        <div className="transparent">
          <p>{name}</p>
          <p>ID {getIdCreationYears()}</p>
        </div>
        <ul className="character-info">
          <li>
            Status: <span>{status} </span>
          </li>
          <li>
            Species: <span> {species}</span>
          </li>
          <li>
            Gender: <span>{gender}</span>
          </li>
          <li>
            Origin: <span>{origin.name}</span>
          </li>
          <li>
            Last Location:<span>{location.name}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default CharacterList;

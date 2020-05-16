import React from 'react';
import './CharacterList.css';
import PropTypes from 'prop-types';

const CharacterList = (props) => {
  const { character } = props;
  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    location,
    created,
  } = character;

  const getIdCreationYears = () => {
    return `Created ${parseInt(new Date().getFullYear(), 10) -
      parseInt(new Date(created).getFullYear(), 10)} years ago`;
  };

  return (
    <React.Fragment>
      <div className="card">
        <img src={image} alt={name} />
        <div className="transparent">
          <p>{name}</p>
          <p>
            ID
            {getIdCreationYears()}
          </p>
        </div>
        <ul className="character-info">
          <li>
            Status:
            <span>{status}</span>
          </li>
          <li>
            Species:
            <span>{species}</span>
          </li>
          <li>
            Gender:
            <span>{gender}</span>
          </li>
          <li>
            Origin:
            <span>{origin.name}</span>
          </li>
          <li>
            Last Location:
            <span>{location.name}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

CharacterList.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterList;

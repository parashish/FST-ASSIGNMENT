import React from 'react';

function CharacterList(props) {
  return (
    <React.Fragment>
      <div className="col-sm-3 col-xs-6 character-content">
        <div className="character">
          <div className="image-container">
            <img src={props.character.image} alt="character" />
            <p className="name-container">
              {props.character.name}
              <br />
              <span className="id-age">
                Id: {props.character.id} - created 2 years ago
              </span>
            </p>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td className="td-label">STATUS</td>
                <td className="td-value">{props.character.status}</td>
              </tr>
              <tr>
                <td className="td-label">SPECIES</td>
                <td className="td-value">{props.character.species}</td>
              </tr>
              <tr>
                <td className="td-label">GENDER</td>
                <td className="td-value">{props.character.gender}</td>
              </tr>
              <tr>
                <td className="td-label">ORIGIN</td>
                <td className="td-value">{props.character.origin.name}</td>
              </tr>
              <tr>
                <td className="td-label">LAST LOCATION</td>
                <td className="td-value">{props.character.location.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CharacterList;

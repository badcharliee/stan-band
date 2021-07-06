import React from 'react';
import BandCard from './BandCard';

/* remove me */
import alvvays from '../assets/alvvays.jpeg';
import phoebe from '../assets/phoebe-bridgers.jpeg';
import sylvan from '../assets/sylvan-esso.jpeg';
import foxygen from '../assets/foxygen.jpeg';

class TopBands extends React.Component {

  render() {
    return (
      <div>
        <h2 className="ui header" style={{ color: 'white' }}>Top Bands</h2>
        <div className="ui stackable four column grid">
          <div className="row">
            <div className="column"><BandCard imagePath={alvvays} bandName="Alvvays" stanCount={1009} bandId="dummy" introducerUserId="dummy" /></div>
            <div className="column"><BandCard imagePath={phoebe} bandName="Phoebe Bridgers" stanCount={201} bandId="dummy" introducerUserId="dummy" /></div>
            <div className="column"><BandCard imagePath={sylvan} bandName="Sylvan Esso" stanCount={189} bandId="dummy" introducerUserId="dummy" /></div>
            <div className="column"><BandCard imagePath={foxygen} bandName="Foxygen" stanCount={168} bandId="dummy" introducerUserId="dummy" /></div>
          </div>
        </div>
      </div>
    );
  }

}

export default TopBands;

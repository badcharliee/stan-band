import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './bands/Home';
import BandList from './bands/BandList';
import NewBandList from './bands/NewBandList';
import Band from './bands/Band';
import Stan from './bands/Stan';
import SpotifyCallback from './bands/SpotifyCallback';

class App extends React.Component {

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/bands" exact component={BandList} />
          <Route path="/bands/new" exact component={NewBandList} />
          <Route path="/band" exact component={Band} />
          <Route path="/stan" exact component={Stan} />
          <Route path="/callback" exact component={SpotifyCallback} />
        </BrowserRouter>
      </div>
    );
  }

}

export default App;

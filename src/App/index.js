import React from 'react';
import './_App.scss';
import Header from '../Header';
import PickerScreen from '../PickerScreen';
import ProjectsScreen from '../ProjectsScreen';
import { Switch, Route } from 'react-router-dom';
import TestFetch from '../TestFetch';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/" component={PickerScreen} />
          <Route exact path="/projects" component={ProjectsScreen} />
          <Route exact path="/Test" component={TestFetch} />
          {/* <Route render={ErrorScreen} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;

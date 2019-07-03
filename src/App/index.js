import React from 'react';
import './_App.scss';
import Header from '../Header';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          {/* <Route exact path="/" component={PickerScreen} /> */}
          {/* <Route exact path="/" component={ProjectScreen} /> */}
          {/* <Route render={ErrorScreen} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;

import * as React from 'react';
import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import TeamDetail from './components/TeamDetail';
import TeamList from './components/TeamList';
import { store } from './redux/store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
          <div className="App">
          <header className="App-header">
            <Link to="/"> Home</Link>
            <Link to="/teams"> Teams</Link>
            <Link to="/venues"> Venues</Link>
          </header>
          <p className="App-intro">
          <Switch>
            <Route exact={true} path="/teams" component={TeamList} />
            <Route path="/teams/:id" component={TeamDetail} />
            <Route path="/teams/add" component={TeamDetail} />
          </Switch>
            
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;

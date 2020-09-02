import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/main.css';
import Home from './views/Home';
import NavBar from './components/NavBar';
import Quiz from './views/Quiz';
import NoMatch from './views/NoMatch';

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/quiz/:quizId">
        <Quiz />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default App;

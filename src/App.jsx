import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/main.css';
import Home from './views/Home';
import NavBar from './components/NavBar';
import Quiz from './views/Quiz';
import Create from './views/Create';
import NoMatch from './views/NoMatch';
import Container from './components/Container';

// TODO responsive design
// TODO shuffle questions
const App = () => (
  <Router>
    <NavBar />
    <Container>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/quiz/:quizId">
          <Quiz />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;

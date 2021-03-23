import './App.css';
import Navbar from './components/navbar/navbarcomponents'
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <div>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;

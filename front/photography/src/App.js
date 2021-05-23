import './App.css';
import Navbar from './components/navbar/navbarcomponents'
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer'

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
      <Footer/>

    </Router>
  );
}

export default App;

import './App.css';
import {Header, LandingPage,CheckoutPage} from './components/index';

import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
function App() {
  return (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/checkout" exact component = {CheckoutPage} />
    </Switch>
  </Router>
  );
}

export default App;

import './App.css';
import {Header, LandingPage} from './components';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';

//test
import WrapperCheckout from './components/WrapperCheckout';
function App() {
  
  const store = createStore(rootReducer);
  
  return (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/checkout" exact component = {WrapperCheckout} />
      </Switch>
    </Router>
  </Provider>
  );
}

export default App;

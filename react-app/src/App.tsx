import './App.css';
import {Header, LandingPage,CheckoutPage} from './components/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers/index';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
function App() {
  
  const store = createStore(rootReducer);
  
  return (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/checkout" exact component = {CheckoutPage} />
      </Switch>
    </Router>
  </Provider>
  );
}

export default App;

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Header, LandingPage } from './components';
import rootReducer from './store/reducers';

// test
import WrapperCheckout from './components/WrapperCheckout';

function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/checkout" exact component={WrapperCheckout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

import './App.css';
import Header from './components/Header/index';
import Line from './components/VerticalLine/index';
import ProductsView from './components/ProductsView/index';
import LandingPageDescription from './components/LandingPageDescription/index';
import SlantedBackground from './components/SlantedBackground/index';
function App() {
  return (
  <>
    <Header />
    <SlantedBackground id="up" />
    <LandingPageDescription />
    <div className="main-page-grid">
      <Line />
      {/* element to catch scroll */}
      <div id="catch-scroll"></div>
      <ProductsView />
      <Line />
    </div>
    <SlantedBackground id="down" />
  </>
  );
}

export default App;

import './App.css';
import {Header,LandingPageDescription,Line,ProductsView,SlantedBackground} from './components/index';
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

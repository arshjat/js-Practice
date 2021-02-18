import './index.css';
import SlantedBackground from './slantedBackground';
import LandingPageDescription from './landingPageDescription';
import ProductsView from './productsView';
import Line from '../verticalLine';

export default function LandingPage():React.ReactElement{
    return (
        <>
        <SlantedBackground id="up" />
        <LandingPageDescription />
        <div className="main-page-grid">
            <Line />
            {/* element to catch scroll */}
            <div id="catch-scroll" />
            <ProductsView />
            <Line />
        </div>
        <SlantedBackground id="down" />
      </>
    );
}
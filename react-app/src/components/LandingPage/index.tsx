import './index.css';
import SlantedBackground from './SlantedBackground/index';
import LandingPageDescription from './LandingPageDescription/index';
import ProductsView from './ProductsView/index';
import Line from '../VerticalLine/index';

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
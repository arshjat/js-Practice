import './index.css';
import descriptionImg1 from './pic1.svg';
import descriptionImg2 from './pic2.svg';
export default function LandingPageDescription(): React.ReactElement{
    return (
        <section className="description-grid">
            <div className="col1">
            <div id="row1">
                <p>
                Welcome to Sprinklr Mart!
                </p>
            </div>
            <div id="row2">
                <article>
                We have a large variety of day-to-day items we are sure you'll
                find useful.
                </article>
            </div>
            </div>
            <div className="col2">
            <div id="pic1">
                <img src={descriptionImg1} width="450px" height="450px" alt="svg-image1" />
            </div>
            <div id="pic2">
                <img src={descriptionImg2} width="500px" height="500px" alt="svg-image2" />
            </div>
            </div>

            <a href="#catch-scroll" onClick={(e) => (e.target as HTMLAnchorElement).style.display = 'none'}><span></span><span></span><span></span
            ></a>
        </section>
    );
}
import './Header.css';
import logo from './sprinklr-logo.png';
export default function Header () {
    return (
        <header>
            <div id="logo">
                <span id="logo-img-container">
                    <img id="logo-img" src={logo} alt="SprinklrLogo" />
                </span>
                <span id="logo-description"><p>Mart</p></span>
            </div>
        </header>
    );
}
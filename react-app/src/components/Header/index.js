import './Header.css';
import logo from './sprinklr-logo.png';
import { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../../store/actions/index';

export default function Header () {
    
    const [countryList,setCountryList] = useState([]);

    const selectedCountry = useSelector(state => state.country.name);
    const flag = useSelector(state => state.country.flag);
    const dispatch = useDispatch();

    useEffect( ()=> {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(async res=> await res.json())
        .then(data => setCountryList(data))
        .catch(err => console.log("got this error while fetching data",err));
    },[]);
    
    const onChangeCountry = (e)=>{
        const newCountry = countryList[e.target.selectedIndex];
        dispatch(actions.countryActions.changeCountryInfo(newCountry.name,newCountry.flag));
    };

    return (
        <header>
            <div id="logo">
                <span id="logo-img-container">
                    <img id="logo-img" src={logo} alt="SprinklrLogo" />
                </span>
                <span id="logo-description"><p>Mart</p></span>
            </div>
            <div id="country-select">
                <div className="country-name">
                    <select className="reset" value = {selectedCountry} onChange={onChangeCountry}>
                        {countryList.map(item => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flag-icon">
                    <img src = {flag} alt="flag-icon" height="30%" width="100%" />
                </div>
            </div>
        </header>
    );
}
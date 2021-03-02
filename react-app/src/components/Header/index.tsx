import './Header.css';
// const logo = require('./sprinklr-logo.png')
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './sprinklr-logo.png';
import actions from '../../store/actions';

const selectorFn = (state: {country: {name: string}}):string => state.country.name;

export default function Header():React.ReactElement {
  const initialState:({name:string, flag:string})[] = [];
  const [countryList, setCountryList] = useState(initialState);
  const selectedCountry = useSelector(selectorFn);
  const flag = useSelector((state: {country: {flag: string}}) => state.country.flag);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((res:Response) => res.json())
      .then((data:[]) => setCountryList(data))
      .catch((err:Error) => {
        throw new Error(err.message);
      });
  }, []);

  const onChangeCountry = (e:React.ChangeEvent<HTMLSelectElement>): void => {
    const newCountry:{
            name : string,
            flag : string
        } = countryList[e.target.selectedIndex];
    dispatch(actions.countryActions.changeCountryInfo(newCountry.name, newCountry.flag));
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
          <select className="reset" value={selectedCountry} onChange={onChangeCountry}>
            {countryList.map((item: {name: string}) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="flag-icon">
          <img src={flag} alt="flag-icon" height="30%" width="100%" />
        </div>
      </div>
    </header>
  );
}

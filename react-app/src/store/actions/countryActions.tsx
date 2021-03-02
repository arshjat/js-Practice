const changeCountryInfo = (name:string, flag:string) => ({
  type: 'CHANGE_COUNTRY_INFO',
  payload: {
    name,
    flag,
  },
});

const countryActions = {
  changeCountryInfo,
};

export default countryActions;

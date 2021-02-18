const changeCountryInfo = (name,flag) => {
    return {
        type : 'CHANGE_COUNTRY_INFO',
        payload : {
            name,
            flag
        }
    }
}

const countryActions = {
    changeCountryInfo
}

export default countryActions;
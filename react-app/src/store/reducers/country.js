const initialState={
    "name" : "India",
    "flag" : "https://restcountries.eu/data/ind.svg"
}

const country = (state=initialState , action) => {
    switch (action.type){
        case 'CHANGE_COUNTRY_INFO' : {
            return {
                "name" : action.payload.name,
                "flag" : action.payload.flag
            }
        } 
        default : return state;
    }
}

export default country;
import {combineReducers} from 'redux';

const cart = (state=[],action) => {
    switch (action.type){
        case "ADD_ITEM" : {
            if(!( state.filter(item=>item[0]===action.payload).length >0)) return [...state,[action.payload,1]];
            
            // else if that product was already present in the list, then just increment the count of that product.
            else return state.map( item => {
                if(item[0]===action.payload) return [item[0],item[1]+1];
                else return item;
            });
        } 

        case "UPDATE_ITEM_COUNT" : {
            return state.map(item => {
                if(item[0]===action.payload.id) return [item[0],action.payload.count];
                else return item;
            })
        }

        case "REMOVE_ITEM" : {
            return state.filter(item => item[0]!==action.payload)
        }

        default : return state;
    }
}

const rootReducer = combineReducers({cart});
export default rootReducer;

const addItem = id => {
    return {
        type : 'ADD_ITEM',
        payload : id
    }
}

const updateCount = (id,count) => {
    return {
        type : 'UPDATE_ITEM_COUNT',
        payload : {
            id : id,
            count : count
        }
    }
}

const removeItem = id => {
    return {
        type : 'REMOVE_ITEM',
        payload : id
    }
}

const actions = {
    addItem,
    updateCount,
    removeItem
}

export default actions;
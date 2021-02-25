const addItem = (id:string) => {
    return {
        type : 'ADD_ITEM',
        payload : id
    }
}

const updateCount = (id:string,count:number) => {
    return {
        type : 'UPDATE_ITEM_COUNT',
        payload : {
            id : id,
            count : count
        }
    }
}

const removeItem = (id:string) => {
    return {
        type : 'REMOVE_ITEM',
        payload : id
    }
}

const cartActions = {
    addItem,
    updateCount,
    removeItem
}

export default cartActions;
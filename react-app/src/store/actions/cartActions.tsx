const addItem = (id:string) => ({
  type: 'ADD_ITEM',
  payload: id,
});

const updateCount = (id:string, count:number) => ({
  type: 'UPDATE_ITEM_COUNT',
  payload: {
    id,
    count,
  },
});

const removeItem = (id:string) => ({
  type: 'REMOVE_ITEM',
  payload: id,
});

const cartActions = {
  addItem,
  updateCount,
  removeItem,
};

export default cartActions;

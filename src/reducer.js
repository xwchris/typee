function reducer(state = {}, action) {
  if (action.key) {
    return Object.assign({}, state, {
      [action.key]: action.value,
    });
  }
  return state;
}

export default reducer;

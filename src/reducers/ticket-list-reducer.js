import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  // destructure the other properties from the action object into the variables names, location and issue.
  const { names, location, issue, id, type, formattedWaitTime, timeOpen } = action;
  switch (type) {
    case c.ADD_TICKET:
      // Next, we state that our switch will be based on the action.type. Because the action parameter takes an object, the reducer needs to look at the action's type property to determine the action it should take.
      return Object.assign({}, state, {
        // In order for this to work correctly, Object.assign() must take three arguments:

        // The first argument must be an empty object {}. Otherwise, Object.assign() will directly mutate the state we pass in instead of making a clone of it first. We don't want to do that!
        // The second argument is the object that will be cloned. In the reducer action above, it's the ticket list state we pass into our function.
        // The third argument is the change that should be made to our new copy. This will always be the new ticket that should be added to our ticket list state.
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime
        }
      });
    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[id];
      return newState;
    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], { formattedWaitTime });
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
    default:
      return state;
  }
};
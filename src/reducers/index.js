import formVisibleReducer from "./form-visible-reducer";
import ticketListReducer from "./ticket-list-reducer";
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer,
  // new line of code below
  firestore: firestoreReducer
});


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer
});

export default rootReducer;
import moment from 'moment';
import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from './../../actions/ActionTypes';
import Moment from 'moment';

describe('ticketListReducer', () => {

  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    timeOpen: 0,
    id: 1
  };

  const currentState = {
    1: {
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1
    },
    2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2
    }
  }

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  // Remember that reducers are pure functions. For that reason, they will never hold any information about an application's current state.


  // describe('ticketListReducer', () => {
  // We add two things to the code:
  // We declare an action but don't define it yet. Each of our new tests will define what the action should be (whether that is adding, updating, or deleting a ticket).
  // We create a ticketData constant that provides ticket information for testing purposes.


  test('Should successfully add new ticket data to masterTicketList', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: c.DELETE_TICKET,
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2
      }

    })
  })

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes',
      id: id
    };
    expect(ticketListReducer({ [id]: ticketData }, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes'
      }
    });
  });

  test('should successfully add a ticket to the ticket list taht includes Moment-formatted wait times', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      id: id,
      formattedWaitTime: new Moment().fromNow(true)
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: 'a few seconds'
      }
    });
  });
});
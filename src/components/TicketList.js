import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
// We need to import hooks functionality from both react-redux and react-redux-firebase.


// Add props as parameter.
function TicketList(props) {
  const tickets = useSelector(state => state.firestore.ordered.tickets);
  // const tickets = useSelector(state => state.firestore.tickets);

  useFirestoreConnect([
    {
      collection: 'tickets',
      // doc: ticketId
    }
  ]);

  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr />
        {/* Loop through the list passed down from TicketControl. */}
        {tickets.map((ticket) => {
          return <Ticket
            whenTicketClicked={props.onTicketSelection}
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id} />
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}


// Add propTypes for ticketList.
TicketList.propTypes = {
  // ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;



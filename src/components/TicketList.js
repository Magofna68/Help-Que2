import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


// Add props as parameter.
function TicketList(props) {
  return (
    <React.Fragment>
      <hr />
      {/* Loop through the list passed down from TicketControl. */}
      {Object.values(props.ticketList).map((ticket) => {
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
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;



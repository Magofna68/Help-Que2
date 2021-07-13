import React from "react";
import PropTypes from "prop-types"

function Ticket(props) {

  return (
    <React.Fragment>
      <div onClick={() => props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
        <hr />
      </div>
    </React.Fragment>
  );
}
// this is how you declare a prop type
Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenTicketClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};

export default Ticket;


// examples of other prop type declarations
//MyExampleComponent.propTypes = {
  //exampleArray: PropTypes.array,
  //exampleBoolean: PropTypes.bool,
  //exampleFunction: PropTypes.func,
  //exampleNumber: PropTypes.number,
  //exampleObject: PropTypes.object,
  //exampleString: PropTypes.string,
  //exampleSymbol: PropTypes.symbol,
  //exampleReactElement: PropTypes.element,


// We can also declare more complex property types as well. For instance, we can declare that a prop is an array full of a specific type of entries:

// We can also declare that a prop is an instance of a class:


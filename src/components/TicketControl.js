import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  render(){
		let currentlyVisibleState = null;
    let buttonText = null;
    if(this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />;
      buttonText = "return to ticket list";
    } else {
      currentlyVisibleState = <TicketList />;
      buttonText = "add ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onCLick = {this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;
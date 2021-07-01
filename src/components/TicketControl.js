import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket : null,
      editing: false,
      money: "billion dollars"
    };
  }
  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
    masterTicketList: newMasterTicketList,
    selectedTicket:null
  });
  }

  handleEditClick = () => {
    console.log ("handleEditClick reached");
    this.setState({editing: true});
  }
  
  handleClick = () => {
    if (this.state.selectedTicket != null ) { 
      this.setState({
      formVisibleOnPage: false,
      selectedTicket: null
    });
  } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,

      }));
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }
  render(){
		let currentlyVisibleState = null;
    let buttonText = null;
    if(this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket ={this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>;
      buttonText = "return to ticket list";
    } else if (this.state.formVisibleOnPage){
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} moneyValue={this.state.money} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList ={this.state.masterTicketList} onTicketSelection ={this.handleChangingSelectedTicket} />;
      buttonText = "add ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      // masterTicketList: [], -- remove this line to implement redux
      selectedTicket: null,
      editing: false,
      money: "billion dollars"
    };
  }
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached");
    this.setState({ editing: true });
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }
  // this.setState(prevState => ({
  //   formVisibleOnPage: !prevState.formVisibleOnPage,
  // }));

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }
  // this.setState({ formVisibleOnPage: false });


  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  }
}
render() {
  let currentlyVisibleState = null;
  let buttonText = null;
  if (this.state.editing) {
    currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
    buttonText = "Return to Ticket List";
    // Note that we also need to change the next conditional to an else if. If it remained an if statement, that conditional would also be met since there is a selectedTicket - which means that the TicketDetail component would show even if editing is set to true.
  } else if (this.state.selectedTicket != null) {
    currentlyVisibleState = <TicketDetail
      ticket={this.state.selectedTicket}
      onClickingDelete={this.handleDeletingTicket}
      onClickingEdit={this.handleEditClick} />;
    buttonText = "return to ticket list";
  } else if (this.props.formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} moneyValue={this.state.money} />;
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
    buttonText = "add ticket";
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={this.handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
    // Now each prop corresponds to a property of state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

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

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  // We won't be using this method for our help queue update - but it's important to see how it works.
  // componentDidUpdate() {
  //   console.log("component updated!");
  // }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: 'tickets', doc: id });
    this.setState({ selectedTicket: null });
  }
  // handleDeletingTicket = (id) => {
  //   const { dispatch } = this.props;
  //   const action = a.deleteTicket(id);
  //   dispatch(action);
  //   this.setState({ selectedTicket: null });
  // }

  handleEditClick = () => {
    console.log("handleEditClick reached");
    this.setState({ editing: true });
  }

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }
  // handleEditingTicketInList = (ticketToEdit) => {
  //   const { dispatch } = this.props;
  //   const action = a.addTicket(ticketToEdit);
  //   dispatch(action);
  //   this.setState({
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }

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

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }
  // this.setState({ formVisibleOnPage: false });

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({ selectedTicket: firestoreTicket });
    });
  }
  // handleChangingSelectedTicket = (id) => {
  //   const selectedTicket = this.props.masterTicketList[id];
  //   this.setState({ selectedTicket: selectedTicket });
  // }

  render() {
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      // All of the code previously in our render() method should go in this conditional.
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
      // }

      return (
        <React.Fragment>
          {currentlyVisibleState}
          < button onClick={this.handleClick} > {buttonText}</button >
        </React.Fragment >
      );
    }
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

export default withFirestore(TicketControl);
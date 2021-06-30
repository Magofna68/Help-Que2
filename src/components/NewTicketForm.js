import React from "react";
import { v4 } from 'uuid';

function NewTicketForm (props) {
	function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    console.log(event.target.names.value);
    console.log(event.target.location.value);
    console.log(event.target.issue.value);
  }

	return (
		<React.Fragment>
			<form onSubmit ={handleNewTicketFormSubmission}>
				<input
					type='text'
					name='names'
					placeholder='pair names'/>
				<input
					type='text'
					name='location'
					placeholder='location'/>
				<textarea
					name='issue'
					placeholder='location'/>
				<button type='submit'>help!</button>
			</form>
			


		</React.Fragment>
	);
}

export default NewTicketForm;
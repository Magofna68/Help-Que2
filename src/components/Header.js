import React from "react";
// import Space from "./../img/Space";
import { Link } from "react-router-dom";

function Header() {
	return (
		<React.Fragment>
			<h1> Help Queue</h1>
			<p><Link to="/">Home</Link></p>
			<p><Link to="/signin">Sign In</Link></p>
		</React.Fragment>
	);
}

// function Header() {
// 	return (
// 		<React.Fragment>
// 			<img src={Space} alt="space" />
// 		</React.Fragment>
// 	);
// }
export default Header;
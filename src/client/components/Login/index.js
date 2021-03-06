import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { authSuccess } from "../../actions";
import { createHandleSubmit } from "../authFormHelper";
import LoginForm from "./LoginForm";
import Banner from "./Banner";
import GlobalBanner from "../Banner";

const mapStateToProps = (state, ownProps) => {
	const { isAuthenticated } = state.user;
	return {
		isAuthenticated
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: createHandleSubmit(dispatch, "/login", [
			{ name: "email", label: "Email" },
			{ name: "password", label: "Password" }
		])
	};
}

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errors: {},
			message: ""
		}

		let { location } = this.props;

		if(location.state && location.state.message) this.state.message = location.state.message;

		this.handleSubmit = this.props.handleSubmit.bind(this);
	}


	onDismiss() {
		this.setState({ errors: {} })
	}

	render() {
		const { isAuthenticated, location } = this.props;
		const { errors, loading } = this.state;

		if(isAuthenticated) return <Redirect to={ location.state && location.state.referrer ? location.state.referrer : "/dashboard" } />;


		return (
			<div>
				<GlobalBanner message={this.state.message} onDismiss={() => this.setState({ message: "" })}/>
				<h1>Log In</h1>
				<LoginForm
					handleSubmit={this.handleSubmit}
					loading={loading}
					errors={errors}
				/>
				{
					process.env["apps_released"] === "true" ?
					(
						<Link to="/signup">
							<Button color="teal" fluid size="large">I don't have an account yet.</Button>
						</Link>
					) : null
				}
				<div style={{
					display: "block",
					margin: "0 auto",
					textAlign: "center",
					fontStyle: "italic"
				}}><Link to="/profile/reset-password">I forgot my password!</Link></div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

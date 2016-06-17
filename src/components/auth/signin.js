import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from 'actions/authActions';

class Signin extends Component {
	componentWillMount() {
		this.props.clearSubmit();
		this.props.clearError();
	}

  clearSubmit() {
		this.props.clearSubmit();
	}

	handleFormSubmit({ email, password }) {
		 this.props.signinUser({email, password});
	}

	renderAlert() {
		if (this.props.errorMessage && this.props.submitted) {
			return (
					<div className="alert alert-danger">
					  <strong>Oops!</strong> {this.props.errorMessage}
					</div>
			);
		}
	}

	render() {
		const { handleSubmit, fields: { email, password }} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email</label>
					<input {...email} className="form-control"  />
				</fieldset>
				<fieldset className="form-group">
					<label>Password</label>
					<input onClick={this.clearSubmit.bind(this)} {...password} type="password" className="form-control"  />
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { 
		errorMessage: state.auth.error,
		submitted: state.auth.submitted
	 };
}



export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

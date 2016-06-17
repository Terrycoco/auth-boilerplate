import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from 'actions/authActions';

class Signup extends Component {
	componentWillMount() {
		this.props.clearSubmit();
		this.props.clearError();
	}

	clearSubmit() {
		this.props.clearSubmit();
	}

	handleFormSubmit(formProps){
		//call action creator to sign up user
		this.props.signupUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage && this.props.submitted) {
			return <div className="alert alert-danger"><strong>Oops!</strong> {this.props.errorMessage}</div>
		}
	}

	render() {
		const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
			<fieldset className="form-group">
				<label>Email</label>
				<input onClick={this.clearSubmit.bind(this)} className="form-control" {...email} />
				{email.touched && email.error && <div className="text-danger">{email.error}</div>}
			</fieldset>
			<fieldset className="form-group">
				<label>Password</label>
				<input type="password" className="form-control" {...password} />
		    {password.touched && password.error && <div className="text-danger">{password.error}</div>}
			</fieldset>
						<fieldset className="form-group">
				<label>Confirm Password</label>
				<input type="password" className="form-control" {...passwordConfirm} />
				{passwordConfirm.touched && passwordConfirm.error && <div className="text-danger"> {passwordConfirm.error}</div>}
			</fieldset>
			{this.renderAlert()}
			<button action="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}
}

//redux-form automatically calls this after any event
function validate(formProps) {
	const errors = {};
	if (!formProps.email) {
		errors.email = 'You must enter an email';
	}
	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}
	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please confirm your password';
	}
  if (formProps.password !== formProps.passwordConfirm) {
  	errors.passwordConfirm = 'Passwords must match';
  }
	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error,
		submitted: state.auth.submitted
	};
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate
}, mapStateToProps, actions)(Signup);


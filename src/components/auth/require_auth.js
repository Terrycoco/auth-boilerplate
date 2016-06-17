import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(InputComponent) {
  class Authenticated extends Component {
  	//grab router from context
  	static contextTypes = {
  		router: React.PropTypes.object
  	}
    
    //check before first render
    componentWillMount() {
	    if(!this.props.authenticated) {
	    	this.context.router.push('/');
	    }
    }

    //and when the props change
    componentWillUpdate(nextProps) {
    	if(!nextProps.authenticated) {
    		this.context.router.push('/');
    	}
    }

    render() {
    	return (
    		<InputComponent {...this.props} />
    	);
    }
  }

  function mapStateToProps(state) {
  	return {
  		authenticated: state.auth.authenticated
  	};
  }

  return connect(mapStateToProps)(Authenticated);
}
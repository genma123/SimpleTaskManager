import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList';
import _ from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
		init: true,
		tasks: []
    };
  }
  
  retrieve() {
	  var app = this;
	  return fetch(`api/tasks`)
	  .then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  console.log("tasks: " + JSON.stringify(data));
		  app.setState({ tasks: data });
	  });
	  ;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
	let init = this.state.init;
	return init || !_(this.state).differenceWith(nextState, _.isEqual).isEmpty();
  }
  
  componentWillMount() {
    this.retrieve();
  }
  
  componentDidUpdate() {
    this.setState({init: false});
  }
  
  render() {
	return (
		<div className="container">
			<h1>MyTaskList</h1>
			<hr/>
			<form className="well">
			   <div className="form-group">
				   <input type="text" name="title" className="form-control" placeholder="Add Task..."/>
			   </div>
			</form>
			<TaskList tasks={this.state.tasks} />
		</div>    );
  }
}

export default App;

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
	
	this.add = this.add.bind(this);
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
  }
  
  add(event) {
	  /* console.log("In add, this: " + this + ", target: " + event.target);
	  if (event.target) {
		  console.log("value: " + event.target.elements.title.value);
	  } */
	  var app = this;
	  var task = { title: event.target.elements.title.value, isDone: false };
	  var body = JSON.stringify(task);
	  console.log("Posting: " + body);
	  fetch(`api/task`, {
 		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
 		  },
 		  method: "POST",
		  body: body
	  }).then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  var tasks = app.state.tasks.concat([data]);
		  app.setState({ tasks: tasks });
	  });
	  event.preventDefault();
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
	let init = this.state.init;
	console.log("this.state.tasks: " + JSON.stringify(this.state.tasks, null, 2));
	console.log("nextState.tasks: " + JSON.stringify(nextState.tasks, null, 2));
	// let diff = _(this.state.tasks).differenceWith(nextState.tasks, _.isEqual);
	// console.log("diff: " + JSON.stringify(diff, null, 2));
	return init || !_.isEqual(this.state.tasks.sort(), nextState.tasks.sort());
  }
  
  componentWillMount() {
	this.retrieve();
  }
  
  componentDidUpdate() {
    this.setState({init: false});
  }
  
  render() {
	  console.log("IN App.render()");
	return (
		<div className="container">
			<h1>MyTaskList</h1>
			<hr/>
			<form className="well" onSubmit={this.add}>
			   <div className="form-group">
				   <input type="text" name="title" className="form-control" placeholder="Add Task..."/>
			   </div>
			</form>
			<TaskList tasks={this.state.tasks} />
		</div>    );
  }
}

export default App;

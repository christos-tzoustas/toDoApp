import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';

class RemoveItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const index = this.props.index;
		this.props.onClick(index);
	}

	render() {
		return (
			<span className="todo-box__list-delete" onClick={this.handleClick}>
				<i className="fas fa-minus" />
			</span>
		);
	}
}

class TodosList extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		const li = e.target;
		li.classList.toggle('todo-box__list-item--completed');
	}

	render() {
		const todos = [];

		for (let i = 0; i < this.props.todos.length; i++) {
			todos.push(
				<li className="todo-box__list-item" onClick={this.onClick} key={i}>
					<RemoveItem index={i} onClick={this.props.onClick} /> {this.props.todos[i]}{' '}
				</li>
			);
		}

		return <ul className="todo-box__list">{todos}</ul>;
	}
}

class AddBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let item = document.querySelector('.todo-box__form-input').value;

		if (!item.length) {
			return;
		}
		this.props.onSubmit(item);
		document.querySelector('input').value = '';
	}

	render() {
		return (
			<form className="todo-box__form" onSubmit={this.handleSubmit}>
				<div className="todo-box__form-wrapper">
					<button className="todo-box__form-button">
						<i className="fas fa-plus-circle" />
					</button>
					<input className="todo-box__form-input" id="add todo" type="text" />
				</div>
				<label className="todo-box__form-label">Add item</label>
			</form>
		);
	}
}

function Subheading(props) {
	return <h3 className="todo-box__subheading u-margin-bottom-small"> What do you want to get done today?</h3>;
}

function AppHeading(props) {
	return <h1 className="todo-box__heading u-margin-bottom-medium">Hi {props.name} !</h1>;
}

class NamePrompt extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		//make one function for both cases
		e.preventDefault();
		let name = document.querySelector('.name-prompt__form-input').value;

		if (!name.length) {
			return;
		}
		this.props.onSubmit(name);
		document.querySelector('.name-prompt__form-input').value = '';
	}

	render() {
		return (
			<div className="name-prompt">
				<form className="name-prompt__form" onSubmit={this.handleSubmit}>
					<label className="name-prompt__form-label u-margin-bottom-medium"> Please enter your name below to proceed </label>
					<input className="name-prompt__form-input" type="text" />
					<button className="name-prompt__form-button"><i className="far fa-paper-plane"></i></button>
				</form>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { todos: [], username: '' };
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.handleNamePrompt = this.handleNamePrompt.bind(this);
	}

	handleNamePrompt(name) {
		this.setState({ username: name });
	}

	handleAddItem(item) {
		const todos = this.state.todos.slice();
		todos.push(item);
		this.setState({ todos });
	}

	handleRemoveItem(index) {
		const todos = this.state.todos.slice();
		const removedTodo = todos.splice(index, 1);
		this.setState({ todos });
	}

	render() {
		return (
			<main>
				{!this.state.username.length && <NamePrompt onSubmit={this.handleNamePrompt} />}
				{this.state.username.length > 0 && (
					<div className="todo-box">
						<AppHeading name={this.state.username} />
						<Subheading />
						<AddBar onSubmit={this.handleAddItem} />
						{this.state.todos.length > 0 && (
							<TodosList todos={this.state.todos} onClick={this.handleRemoveItem} />
						)}
					</div>
				)}
			</main>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

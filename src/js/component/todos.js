import React, { useState, useEffect } from "react";

const Todos = () => {
	const URL =
		"https://assets.breatheco.de/apis/fake/todos/user/diegorodriguezk";
	const [todos, setTodos] = useState(["comprar comida", "casa", "azul"]);
	const [todo, setTodo] = useState("");
	const [loading, setLoading] = useState(false);
	const getTodos = () => {
		setLoading(true);
		fetch(URL)
			.then(resp => resp.json())
			.then(data => {
				setTodos(data);
				setLoading(false);
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		getTodos();
	}, [todo]);

	let addTodo = e => {
		e.preventDefault();
		const newTodo = { label: todo, done: false };
		const updatedList = [...todos, newTodo];
		setTodos(updatedList);
		console.log(todo);

		fetch(URL, {
			method: "PUT",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	let deleteTodo = i => {
		console.log("before filter", todos);
		const newTodos = todos.filter((element, index) => index !== i);
		setTodos(newTodos);
		console.log("after filter", newTodos);
		fetch(URL, {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	return (
		<div className="todo-app">
			<h1>What&apos;s the plan for Today?</h1>
			<form className="todo-form" onSubmit={e => addTodo(e)}>
				<input
					type="text"
					onChange={e => setTodo(e.target.value)}
					placeholder="Add a todo"
					value={todo}
					name="text"
					className="todo-input"
					autoComplete="off"
				/>
				<input className="todo-button" type="submit" value="Add Todo" />
			</form>
			{loading ? (
				<div> loading </div>
			) : (
				<ul className="todo-container">
					{todos.map((item, index) => (
						<li className="todo-row" key={index}>
							{item.label}
							<button
								className="delete"
								onClick={() => deleteTodo(index)}>
								X
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default Todos;

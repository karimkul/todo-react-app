import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    function addTodo() {
        if (inputValue === "") return;
        const newTodo = {
            id: uuid(),
            text: inputValue,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setInputValue("");
    }

    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function toggleComplete(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    return (
        <div>
            <h1>Todo app</h1>
            <hr />
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What is your mind?"
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <hr />

            <ul>
                {todos.map((todo, index) => (
                    <>
                        <li
                            key={index}
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none"
                            }}
                        >
                            {todo.text}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                            />
                            <button onClick={() => deleteTodo(todo.id)}>
                                ❌
                            </button>
                        </li>
                        <hr />
                    </>
                ))}
            </ul>
        </div>
    );
}

export default App;

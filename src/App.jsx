import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [filter, setFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    // Handle adding a new todo
    function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            setTodos([
                ...todos,
                { id: uuid(), text: inputValue, completed: false }
            ]);
            setInputValue("");
        }
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

    function saveEdit(id) {
        if (editText.trim() === "") return;

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText } : todo
            )
        );
        setEditingId(null);
        setEditText("");
    }

    function handleEditKeyDown(e, id) {
        if (e.key === "Enter") {
            saveEdit(id);
        }
    }

    const filteredTodos = todos
        .filter((todo) =>
            todo.text.toLowerCase().includes(searchItem.toLowerCase())
        )
        .filter((todo) =>
            filter === "All"
                ? true
                : filter === "Done"
                ? todo.completed
                : !todo.completed
        );

    function toggleDarkMode() {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.classList.toggle("dark-mode", newMode);
            return newMode;
        });
    }
    return (
        <div>
            <h1>Todo App</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What is on your mind?"
                />
                <button type="submit">Add Todo</button>
                <hr />
                <input
                    type="search"
                    placeholder="Search the item"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Done">Done</option>
                    <option value="Todo">Todo</option>
                </select>
            </form>
            <ul>
                <AnimatePresence>
                    {filteredTodos.map((todo) => (
                        <motion.li
                            key={todo.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none"
                            }}
                        >
                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) =>
                                        setEditText(e.target.value)
                                    }
                                    onBlur={() => saveEdit(todo.id)}
                                    onKeyDown={(e) =>
                                        handleEditKeyDown(e, todo.id)
                                    }
                                    autoFocus
                                />
                            ) : (
                                <span>{todo.text}</span>
                            )}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                            />
                            <button onClick={() => deleteTodo(todo.id)}>
                                ❌
                            </button>
                            {editingId !== todo.id && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(todo.id);
                                        setEditText(todo.text);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
            <button onClick={toggleDarkMode}>
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}

export default App;

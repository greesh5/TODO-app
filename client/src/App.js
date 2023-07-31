import React, { useState, useEffect } from 'react';
const API_BASE = 'http://localhost:5000';
function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    fetch(API_BASE + '/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log('Error:', err));
  };
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + '/todo/complete/' + id, {
      method: 'PUT',
    }).then((res) => res.json());
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === data.id ? { ...todo, completed: data.completed } : todo
      )
    );
  };
  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + '/todo/delete/' + id, {
      method: 'DELETE',
    }).then((res) => res.json());
    setTodos((todos) => todos.filter((todo) => todo.id !== data.id));
  };
  const addTodo = async () => {
    const data = await fetch(API_BASE + '/todo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    setTodos((todos) => [...todos, data]);
    setPopupActive(false);
    setNewTodo('');
  };
  return (
    <div className="App">
      <h1>Howdy!</h1>
      <h4>Your tasks for the day:</h4>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={'todo ' + (todo.completed ? 'is-complete' : '')}
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div
              className="delete-todo"
              onClick={() => deleteTodo(todo.id)}
            >
              x
            </div>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default App;
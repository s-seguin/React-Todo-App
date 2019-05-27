import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  
  return (
    <div className="TODO APP">
      <Layout>
          <AddTodo 
            inputValue={inputValue}
            onInputChange={(e) => setInputValue(e.target.value)}
            onButtonClick={addTodo}
            onInputKeyPress={checkIfEnter}
          />
          <TodoList
            items={todos}
            onItemRemove={onDelete}
            onItemCheck={onCompleted}
          />
      </Layout>
    </div>
  );

  /**
   * Add Item to the list of todo items
   */
  function addTodo() {
    if (inputValue !== '') {
      setTodos(
        todos.concat({
          inputValue,
          checked: false,
        })
      );
    }
    setInputValue('');
  }

  /**
   * Check if we pressed the enter key to make it quicker to enter new items to the list
   */
  function checkIfEnter(e) {
    let code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13)
      addTodo();

  }

  /**
   * Delete items that you don't want to have anymore
   * @param {*} id 
   */
  function onDelete(id) {
    setTodos(todos.filter((item, index) => id !== index));
   // console.log("deleting id " + id);
  }

  /**
   * Check the completed box
   */
  function onCompleted(id) {
    setTodos(
      todos.map((todo, index) => {
        if (id === index) {
          todo.checked = !todo.checked;
        }

        return todo;
      })
    );
  }

}


export default App;

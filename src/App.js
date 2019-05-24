import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useInputValue } from './hooks/useInputValue';

function App() {
  const [inputValue, setInputValue] = useState();
  const [todos, setTodos] = useState([]);
  return (
    <div className="TODO APP">
      <Layout>
          <AddTodo 
            inputValue={inputValue}
            onInputChange={(e) => setInputValue(e.target.value)}
            onButtonClick={()=> {
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
            }
          />
          <TodoList
            items={todos}
          />
      </Layout>
      <div id="test"></div>
    </div>
  );
}

function addTodo() {
  alert('You clicked todo');
}
export default App;

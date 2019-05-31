import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState([{ name: "Default", todos: [] }]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  return (
    <div className="TODO APP">
      <Layout
        onNewList={createNewList}
        switchPage={switchList}
        renameList={renameList}
        lists={lists}
        selectedIndex={selectedListIndex}
      >
        <AddTodo
          inputValue={inputValue}
          onInputChange={e => setInputValue(e.target.value)}
          onButtonClick={addTodo}
          onInputKeyPress={checkIfEnter}
        />
        <TodoList
          items={lists[selectedListIndex].todos}
          onItemRemove={onDeleteTodo}
          onItemCheck={onCompleted}
        />
      </Layout>
    </div>
  );

  /**
   * Add Item to the list of todo items
   */
  function addTodo() {
    if (inputValue !== "") {
      let listsCopy = lists.slice();
      listsCopy[selectedListIndex].todos.push({ inputValue, checked: false });

      setLists(listsCopy);
    }
    setInputValue("");
  }

  /**
   * Check if we pressed the enter key to make it quicker to enter new items to the list
   */
  function checkIfEnter(e) {
    let code = e.keyCode ? e.keyCode : e.which;

    if (code === 13) addTodo();
  }

  /**
   * Delete items that you don't want to have anymore
   * @param {*} id
   */
  function onDeleteTodo(id) {
    let listsCopy = lists.slice();
    listsCopy[selectedListIndex].todos = lists[selectedListIndex].todos.filter(
      (item, index) => index !== id
    );
    setLists(listsCopy);
  }

  /**
   * Check the completed box
   */
  function onCompleted(id) {
    let listsCopy = lists.slice();
    listsCopy[selectedListIndex].todos = lists[selectedListIndex].todos.map(
      (todo, index) => {
        if (id === index) {
          todo.checked = !todo.checked;
        }

        return todo;
      }
    );

    setLists(listsCopy);
  }

  function createNewList() {
    let listsCopy = lists.slice();
    listsCopy.push({ name: "List " + listsCopy.length, todos: [] });
    setLists(listsCopy);
    setSelectedListIndex(listsCopy.length - 1);
  }

  function switchList(index) {
    setSelectedListIndex(index);
  }

  function renameList(newName) {
    console.log("Rename list " + newName);
    let listsCopy = lists.slice();
    listsCopy[selectedListIndex].name = newName;
    setLists(listsCopy);
  }
}

export default App;

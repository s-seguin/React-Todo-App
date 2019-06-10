import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [inputValue, setInputValue] = useState(""); //holds the value of the addTodo input field
  const [lists, setLists] = useState([{ name: "Default", todos: [] }]); //the collection of lists and there content
  const [selectedListIndex, setSelectedListIndex] = useState(0); //keeps track of which list we are currently on

  return (
    <div className="TODO APP">
      <Layout
        onNewList={createNewList}
        switchPage={switchList}
        deletePage={deleteList}
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

  /**
   * Creates a new list and names it List 'X' where X is the number of lists we have - 1
   */
  function createNewList() {
    let listsCopy = lists.slice();
    listsCopy.push({ name: "List " + listsCopy.length, todos: [] });
    setLists(listsCopy);
    setSelectedListIndex(listsCopy.length - 1);
  }

  /**
   * Switch the list we are currently displaying
   * @param {int} index
   */
  function switchList(index) {
    setSelectedListIndex(index);
  }

  /**
   * Rename the list we are currently on
   * @param {string} newName
   */
  function renameList(newName) {
    let listsCopy = lists.slice();
    listsCopy[selectedListIndex].name = newName;
    setLists(listsCopy);
  }

  /**
   * Delete the list we are currently on
   */
  function deleteList() {
    //If there is only one list, reset its contents and name
    if (selectedListIndex === 0) {
      setLists([{ name: "Default", todos: [] }]);
      setSelectedListIndex(0);
    } else {
      let listsCopy = lists.slice();
      listsCopy = listsCopy.filter(
        (list, index) => index !== selectedListIndex
      );

      setLists(listsCopy);
      setSelectedListIndex(selectedListIndex - 1);
    }
  }
}

export default App;

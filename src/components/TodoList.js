import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoList() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  const handleAddTodo = () => {
    // Check if both newTitle and newDescription are not empty
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
      };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleCheckedTodo = (index) => {
    let checkedTodoArr = [...allTodos];
    checkedTodoArr[index].checked = !checkedTodoArr[index].checked;
    setTodos(checkedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(checkedTodoArr));
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedTitle(allTodos[index].title);
    setEditedDescription(allTodos[index].description);
  };

  const handleEditSave = (index) => {
    let editedTodoArr = [...allTodos];
    editedTodoArr[index].title = editedTitle;
    editedTodoArr[index].description = editedDescription;
    setTodos(editedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(editedTodoArr));
    setEditIndex(null);
  };

  return (
    <div className="App">
      <h1>TodoList</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Todo Task</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div>
            <input
              type="button"
              onClick={handleAddTodo}
              value="ADD"
              className="todo-input-button"
            />
          </div>
        </div>
        <div className="buttonArea">
          <input type="button" value="Todo" className="todoButton" />
          {/* <input type="button" value="Completed" className="completedButton" /> */}
        </div>
        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div
                className={`todo-list-item ${item.checked ? 'checked' : ''}`}
                key={index}
              >
                <div>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    <h3>{item.title}</h3>
                  )}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    <p>{item.description}</p>
                  )}
                </div>
                <div className="icons">
                  {editIndex === index ? (
                    <div>
                      <button onClick={() => handleEditSave(index)} className='saveButton'>Save</button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <AiOutlineEdit
                          className="edit-icon"
                          onClick={() => handleEditClick(index)}
                        />
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="delete-icon"
                          onClick={() => handleDeleteTodo(index)}
                        />
                      </div>
                      <div>
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleCheckedTodo(index)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

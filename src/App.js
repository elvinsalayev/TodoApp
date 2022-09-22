import { useEffect, useRef, useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import { MdCircle, MdCheckCircle, MdEdit, MdDelete } from 'react-icons/md';


function App() {

  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([{
    id: 123,
    text: "mokoko was here",
    isDone: true
  }]);
  const [currentTodo, setCurrentTodo] = useState();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText && todoText.substring(0, 1) !== " ") {

      if (currentTodo) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === currentTodo.id) {
            return { ...todo, text: todoText }
          }
          return todo;
        });
        setTodos(updatedTodos);
        setCurrentTodo(null)
      }


      else {
        const newTodo = {
          id: uuidv4().substring(0, 3),
          text: todoText,
          isDone: false
        }

        const updatedTodos = [...todos, newTodo]

        setTodos(updatedTodos)
      }


      setTodoText('')
    }
    else {
      alert("nope")
    }
  }

  const handleChange = (e) => {
    setTodoText(e.target.value)
    // if (todoText.substring(0, 1) === " ") {
    //   setTodoText("")
    // }
  }

  const handleDone = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }
      }
      return todo;
    })
    setTodos(updatedTodos)
  }

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setTodoText(todo.text)
    inputRef.current.focus()
  }


  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const handleClearAll = () => {
    setTodos([])
  }


  return (
    <div className='todo'>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={todoText}
          onChange={handleChange}
          ref={inputRef}
          placeholder="enter some text here" />
        <input type="submit"
          value={currentTodo ? "Save" : "Add"}
          disabled={!todoText || todoText.substring(0, 1) === " "} />
      </form>
      {currentTodo && <button onClick={() => {
        setCurrentTodo(null)
        setTodoText('')
      }} >Cancel</button>}

      {todos.length === 3 && <button onClick={handleClearAll}>Clear all</button>}

      <ul>

        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <h3 className={todo.isDone ? 'done' : ""}>{todo.text}</h3>
              <div className="buttons">
                <button className="doneBtn" onClick={() => handleDone(todo.id)}>
                  {todo.isDone ? < MdCheckCircle size={27} /> : <MdCircle size={27} />}
                </button>
                <button className="edit" onClick={() => handleEdit(todo)}><MdEdit size={25} /></button>
                <button className="delete" onClick={() => handleDelete(todo.id)}><MdDelete size={25} /></button>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
}

export default App;

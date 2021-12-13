import { useState } from 'react';
import './App.css';

function App() {

  // Function to get the week day
  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();

    return isNaN(dayOfWeek) ? null :
      ['Sunday 😴', 'Monday 😇', 'Tuesday 🎒', 'Wednesday 🖖', 'Thursday 🤟', 'Friday 🥳', 'Saturday 😋'][dayOfWeek];
  }

  var today = getDayOfWeek(new Date());

  let [todo, setTodo] = useState({});
  let [todoList, setTodoList] = useState([])

  function setStatus(e) {
    setTodoList(todoList.map((eachObj) => {
      console.log("LLLL" , eachObj)

      if (e.target.value == 'notcompleted') {
        console.log("each : ", eachObj.status)
        return eachObj.status === false
      }

      if (e.target.value === 'completed') {
        return eachObj.status === true
      }

    }))
  }

  return (

    <div className='body'>
      <div>
        <div>
          <h1 className='todo-title'>To Do</h1>
          <p>Whoop ! it's {today} </p>

          {/* Select Filter */}

          <span onClick={(e) => {
            setStatus(e)
          }}>Completed</span>
          <span onClick={(e) => {
            setStatus(e)
          }}>Not Completed</span>


        </div>


        {/* Input Field */}
        <div>
          <input type="text" value={todo.text} maxLength={20} className='todo-input' onChange={(event) => {
            setTodo({ id: Date.now(), text: event.target.value, status: false })
          }} />

          {/* Add button */}
          <button className='todo-addbtn' onClick={() => {
            setTodoList([...todoList, todo])
          }}>
            <i className='add-icon far fa-plus-square'></i>
          </button>
        </div>

        {/* Todo lists */}
        <div style={{ overflowY: 'scroll', height: '10em' }}>
          {
            todoList.map((eachToDo) => {
              return (
                <div key={eachToDo.id + Math.random().toFixed(2)} className='todo-body'>
                  <div className='list-wrap'>
                    {/* Todo body */}
                    <div className='todo-list'>
                      {/* Checkbox Input */}

                      {/* Checkbox */}
                      <input type="checkbox" value={eachToDo.status} style={{ float: 'left' }} onClick={(event) => {
                        setTodoList(todoList.filter((eachObj) => {
                          if (eachObj.id === eachToDo.id) {
                            eachToDo.status = event.target.checked
                          }
                          return eachObj
                        }))
                      }} />
                      {/* Todo Text */}
                      <span>
                        {eachToDo.status ? <span style={{ color: '#fcb8b8' }}><s>{eachToDo.text}</s></span> : eachToDo.text}
                      </span>

                      {/* Delete todo*/}
                      <span style={{ float: 'right' }} onClick={(event) => {
                        setTodoList(todoList.filter((eachObj) => {
                          if (eachObj.id === eachToDo.id) {
                            eachToDo.status = event.target.checked
                            return eachObj.id !== eachToDo.id
                          } else {
                            return eachToDo
                          }
                        }))
                      }}>
                        <i className="todo-delete far fa-trash-alt"></i>
                      </span>

                      {/* Edit Todo  */}
                      <span style={{ float: 'right' }}>
                        <i className="todo-edit fas fa-pencil-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;

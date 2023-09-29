import {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import TaskForm from '../TaskForm'
import Task from '../Task'

import './index.css'

function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (tasks.length === 0) return
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks || [])
  }, [])

  function addTask(name) {
    setTasks(prev => [...prev, {name, done: false}])
  }

  function removeTask(indexToRemove) {
    setTasks(prev =>
      prev.filter((taskObject, index) => index !== indexToRemove),
    )
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks[taskIndex].done = newDone
      return newTasks
    })
  }

  const numberComplete = tasks.filter(t => t.done).length
  const numberTotal = tasks.length

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100
    if (percentage === 0) {
      return 'Try to do at least one!'
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝'
    }

    return 'Keep it going 💪🏻'
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks[index].name = newName
      return newTasks
    })
  }

  // Cookies.get() is used to get access token stored in cookies
  const AccessToken = Cookies.get('jwt_token')

  if (AccessToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="main-container">
      <h1>
        {numberComplete}/{numberTotal} Completed
      </h1>
      <h2>{getMessage()}</h2>
      <h2 className="todo-heading">
        Add <span className="title-sub-part">Task</span>
      </h2>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <TaskForm onAdd={addTask} />
      <h2 className="todo-heading">
        My <span className="title-sub-part">Tasks</span>
      </h2>
      {tasks.map((task, index) => (
        <Task
          {...task}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
        />
      ))}
    </div>
  )
}

export default Home

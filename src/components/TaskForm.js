import {useState} from 'react'

function TaskForm({onAdd}) {
  const [taskName, setTaskName] = useState('')

  function handleSubmit(ev) {
    ev.preventDefault()

    if (taskName === '') {
      // eslint-disable-next-line no-alert
      alert('Enter Valid Text')
      return
    }

    onAdd(taskName)
    setTaskName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Your next task..."
      />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default TaskForm

import { Component } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices.js";

class Tasks extends Component {
  state = { tasks: [], currentTask: "" };

 async componentDidMount() {
  try {
    const response = await getTasks();
    console.log("🚨 Raw response from getTasks():", response);

    const { data } = response;
    console.log("📦 Data received:", data);

    let tasks = [];

    if (Array.isArray(data)) {
      tasks = data;
    } else if (data && Array.isArray(data.tasks)) {
      tasks = data.tasks;
    } else {
      console.warn("❌ Unexpected data format. Defaulting to empty array.");
    }

    this.setState({ tasks });
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    this.setState({ tasks: [] });
  }
}


  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = this.state.tasks;
    try {
      const { data } = await addTask({ task: this.state.currentTask });
      const tasks = [...originalTasks, data];
      this.setState({ tasks, currentTask: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (currentTask) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = !tasks[index].completed;
      this.setState({ tasks });
      await updateTask(currentTask, {
        completed: tasks[index].completed,
      });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTask);
      this.setState({ tasks });
      await deleteTask(currentTask);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  render() {
    const { tasks, currentTask } = this.state;

    return (
      <div>
        <h2>Task List</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={currentTask}
            onChange={this.handleChange}
            placeholder="Enter a task"
          />
          <button type="submit">Add Task</button>
        </form>

        <ul>
          {Array.isArray(tasks) ? (
            tasks.map((task) => (
              <li key={task._id}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleUpdate(task._id)}
                >
                  {task.task}
                </span>
                <button onClick={() => this.handleDelete(task._id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>Loading tasks or data format error</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Tasks;

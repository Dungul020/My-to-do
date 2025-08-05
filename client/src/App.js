import React from "react";
import {
  Paper,
  TextField,
  Checkbox,
  Button
} from "@material-ui/core";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from "./taskservice.js";
import "./App.css";

class App extends React.Component {
  state = {
    tasks: [],
    currentTask: "",
  };

  // Fetch tasks from backend
  async componentDidMount() {
    try {
      const tasks = await getTasks();
      console.log("Fetched tasks:", tasks);
      this.setState({ tasks });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  handleChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentTask } = this.state;
    if (!currentTask.trim()) return;

    try {
      const newTask = await addTask({ task: currentTask, completed: false });
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        currentTask: "",
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  handleUpdate = async (id) => {
    const taskToUpdate = this.state.tasks.find((t) => t._id === id);
    if (!taskToUpdate) return;

    try {
      const updatedTask = await updateTask(id, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });

      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task._id === id ? updatedTask : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteTask(id);
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  render() {
    const { tasks, currentTask } = this.state;

    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO</div>

          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{ margin: "15px 0" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "80%" }}
              value={currentTask}
              required
              onChange={this.handleChange}
              placeholder="Add New TO-DO"
            />
            <Button
              style={{ height: "40px" }}
              color="primary"
              variant="outlined"
              type="submit"
            >
              Add task
            </Button>
          </form>

          <div>
            {Array.isArray(tasks) ? (
              tasks.map((task) => (
                <Paper key={task._id} className="flex task_container">
                  <Checkbox
                    checked={task.completed}
                    onClick={() => this.handleUpdate(task._id)}
                    color="primary"
                  />
                  <div
                    className={
                      task.completed ? "task line_through" : "task"
                    }
                  >
                    {task.task}
                  </div>
                  <Button
                    onClick={() => this.handleDelete(task._id)}
                    color="secondary"
                  >
                    delete
                  </Button>
                </Paper>
              ))
            ) : (
              <p>Loading tasks...</p>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;

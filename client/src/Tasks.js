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
      const { data } = await getTasks();
      console.log("Fetched tasks data:", data);

      // ✅ Robust handling of response data
      let tasks = [];

      if (Array.isArray(data)) {
        tasks = data;
      } else if (data && Array.isArray(data.tasks)) {
        tasks = data.tasks;
      } else {
        console.warn("Unexpected tasks response format:", data);
      }

      this.setState({ tasks });
    } catch (error) {
      console.error("Error fetching tasks

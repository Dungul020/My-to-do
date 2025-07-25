// client/src/api.js (or wherever your file is)

import axios from "axios";

// Use env var or fallback to localhost for development
const apiUrl = `${process.env.REACT_APP_API_URL`;

export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(`${apiUrl}/${id}`, task);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

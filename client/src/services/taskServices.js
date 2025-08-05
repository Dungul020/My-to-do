import axios from "axios";

// ✅ Use the correct base URL (for production) and ensure it ends without a trailing slash
const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "https://my-to-do-5sap.onrender.com";

// ✅ Create Axios instance with proper base URL
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // only needed if you're using cookies/auth
});

// ✅ Optional: Log base URL once for debugging
console.log("Using API Base URL:", apiUrl);

// ✅ Interceptor for responses
api.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return Promise.reject(new Error("No data in response"));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || "Request failed",
      });
    } else if (error.request) {
      console.error("Network Error:", error.message);
      return Promise.reject({
        status: null,
        message: "Network error - please check your connection",
      });
    } else {
      console.error("API Setup Error:", error.message);
      return Promise.reject({
        status: null,
        message: "Request configuration error",
      });
    }
  }
);

// ✅ GET all tasks
export async function getTasks() {
  try {
    const response = await api.get("/api/tasks"); // Correct endpoint
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return []; // Safe fallback
  }
}

// ✅ POST a new task
export async function addTask(task) {
  try {
    const response = await api.post("/api/tasks", task); // Correct endpoint
    return response.data;
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
}

// ✅ PUT (update) a task
export async function updateTask(id, task) {
  try {
    const response = await api.put(`/api/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}

// ✅ DELETE a task
export async function deleteTask(id) {
  try {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}

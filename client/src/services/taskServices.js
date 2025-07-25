import axios from "axios";

// Configure base URL - use environment variable with fallback
const apiUrl = process.env.REACT_APP_API_URL || "https://my-to-do-5sap.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if using cookies/auth
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Ensure data exists and is in expected format
    if (!response.data) {
      return Promise.reject(new Error("No data in response"));
    }
    return response;
  },
  (error) => {
    // Handle network errors and server errors
    if (error.response) {
      // Server responded with non-2xx status
      console.error("API Error:", error.response.status, error.response.data);
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || "Request failed",
      });
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.message);
      return Promise.reject({
        status: null,
        message: "Network error - please check your connection",
      });
    } else {
      // Other errors
      console.error("API Setup Error:", error.message);
      return Promise.reject({
        status: null,
        message: "Request configuration error",
      });
    }
  }
);

// API functions with improved error handling
export async function getTasks() {
  try {
    const response = await api.get("/api/tasks");
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return []; // Return empty array on error
  }
}

export async function addTask(task) {
  try {
    const response = await api.post("/api/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error; // Re-throw for component to handle
  }
}

export async function updateTask(id, task) {
  try {
    const response = await api.put(`/api/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}

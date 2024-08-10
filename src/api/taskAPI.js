import api from "./apiFunctions.js";

// Function to get tasks for a specific user
async function getTasks() {
  try {
    const response = await api.get(`/task`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

async function createTask() {
  try {
    const response = await api.post(`/task`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    const response = await api.delete(`/task/${taskId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

async function editTask() {
  try {
    const response = await api.put(`/task`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export { createTask, editTask, deleteTask, getTasks };

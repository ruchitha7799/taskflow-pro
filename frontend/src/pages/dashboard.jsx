import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data.tasks);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  // Create task
  const createTask = async () => {

    if (!title) return;

    try {

      await API.post("/tasks", {
        title
      });

      setTitle("");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };


  // Delete task
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button onClick={createTask}>
        Add Task
      </button>

      <hr />

      {
        tasks.map((task) => (
          <div key={task.id}>

            <h4>{task.title}</h4>

            <button
              onClick={() =>
                deleteTask(task.id)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      }

    </div>
  );
}
import { useState } from "react";
import { FaBeer } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Task ~ 1", description: "Get up at 5:00", done: false },
    { id: 2, task: "Task ~ 2", description: "Go to Market", done: false },
    {
      id: 3,
      task: "Task ~ 3",
      description: "Have a lesson in SOFT CLUB",
      done: false,
    },
  ]);
  // ! Hook
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [dialogModalOpen, setDialogModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filterDone, setFilterDone] = useState("all");
  const [search, setSearch] = useState("");

  // ! Delete
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // ! Functions
  function openModal() {
    setEditTaskId(null);
    setNewTask("");
    setDescription("");
    setDialogModalOpen(true);
  }

  // ! Modalka & open/
  function openEditModal(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setNewTask(taskToEdit.task);
      setDescription(taskToEdit.description);
      setDialogModalOpen(true);
    }
  }

  // !  Modalka & close/
  function closeModal() {
    setDialogModalOpen(false);
  }

  // ! Add task
  function addTask() {
    const newTaskForDay = {
      id: Date.now(),
      task: newTask,
      description: description,
      done: false,
    };
    setTasks([...tasks, newTaskForDay]);
    setNewTask("");
    setDescription("");
    closeModal();
  }

  //! Edit task
  function editTask() {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, task: newTask, description: description }
          : task
      )
    );
    closeModal();
  }

  //! Checkbox-dane
  function isDoneTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // ! Filter by task
  function filterByDone(taskList) {
    if (filterDone === "all") return taskList;
    return taskList.filter((task) =>
      filterDone === "done" ? task.done : !task.done
    );
  }

  const filterBySearch = tasks.filter((e) =>
    JSON.stringify(e).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="cotigiries">
        <div className="main">
          <h1>TODO</h1>
          <div className="list">
            <span className="purpule"></span> <span> work</span>
          </div>
          <div className="list">
            <span className="blue"></span> <span> study</span>
          </div>
          <div className="list">
            <span className="pink"></span> <span> entertainment</span>
          </div>
          <div className="list">
            <span className="green"></span> <span> family</span>
          </div>
          <div className="listImp">
            <input type="checkbox" /> <span>Hide done task</span>
          </div>
        </div>

        <div className="special">
          <div className="filters">
            <input
              type="search"
              value={search}
              placeholder="Search tasks..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              name="filtered"
              id="filtered"
              onChange={(e) => setFilterDone(e.target.value)}
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="notDone">Not done</option>
            </select>
            <button className="addTask" onClick={openModal}>
              +
            </button>
          </div>

          {/* task */}
          <div className="taskList">
            {filterByDone(filterBySearch).map((task) => (
              <div key={task.id} className="task">
                <h3 className={task.done ? "done" : "notdone"}>{task.task}</h3>
                <p>{task.description}</p>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => openEditModal(task.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                  <div className="doneCheckbox">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => isDoneTask(task.id)}
                    />
                    <span>done</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* madalka */}
          {dialogModalOpen && (
            <div className="modal">
              <div className="modalContent">
                <h2 className="modalTitle">
                  {editTaskId ? "Edit Task" : "Task"}
                </h2>
                <button className="modalClose" onClick={closeModal}>
                  &times;
                </button>
                <label className="modalLabel">Title</label>
                <input
                  type="text"
                  placeholder="Placeholder text"
                  className="modalInput"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <label className="modalLabel">Description</label>
                <textarea
                  placeholder="Placeholder text"
                  className="modalTextarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="modalActions">
                  <button
                    className="modalSave"
                    onClick={editTaskId ? editTask : addTask}
                  >
                    {editTaskId ? "Save" : "Add"}
                  </button>
                  <button className="modalCancel" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

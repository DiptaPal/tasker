import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
    const defaultTasks = {
        id: crypto.randomUUID(),
        title: "Learn React",
        description:
            "I want to Learn React such than I can treat it like my slave and make it do whatever I want it to do.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavorite: true,
    };

    const [tasks, setTasks] = useState([defaultTasks]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setTasks([...tasks]);
        } else {
            setTasks(
                tasks.filter((task) =>
                    task.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    };

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            );
        }
        setShowAddTaskModal(false);
    };

    const handleDeleteAllTaskClick = () => {
        tasks.length = 0;
        setTasks([...tasks]);
    };

    const handleFavTask = (taskId) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isFavorite: !task.isFavorite };
                }
                return task;
            })
        );
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleEditTask = (editedTask) => {
        setTaskToUpdate(editedTask);
        setShowAddTaskModal(true);
    };

    const handleCloseClick = () => {
        setShowAddTaskModal(false);
        setTaskToUpdate(null);
    };

    return (
        <section className="mb-20" id="tasks">
            {showAddTaskModal && (
                <AddTaskModal
                    handleCloseClick={handleCloseClick}
                    taskToUpdate={taskToUpdate}
                    onSave={handleAddEditTask}
                />
            )}
            <div className="container mx-auto">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions
                        onDeleteAllClick={handleDeleteAllTaskClick}
                        onAddClick={() => setShowAddTaskModal(true)}
                    />
                    {tasks.length > 0 ? (
                        <TaskList
                            tasks={tasks}
                            onFav={handleFavTask}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                        />
                    ) : (
                        <NoTaskFound />
                    )}
                </div>
            </div>
        </section>
    );
}

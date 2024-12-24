import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleEditMenu = () => {
        setIsEditOpen(!isOpen);
    };

    useEffect(() => {
        const fetchMyTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const tasksResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/user-tasks`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(tasksResponse.data);
                setTasks(tasksResponse.data.User_own_Tasks);
            }
            catch (err) {
                console.error(err);
                setError('Failed to fetch tasks or users.');
            }
        };

        fetchMyTasks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/create-a-task`, { ...newTask },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setSuccess('Task created successfully.');
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
            });

            const tasksResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/user-tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasksResponse.data);

        }
        catch (err) {
            console.error(err);
            setError('Failed to create task.');
        }
    };

    const handleEditTask = async (task) => {
        setEditingTaskId(task._id);
        setNewTask({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.split('T')[0],
        });
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/update-task/${editingTaskId}`,
                newTask,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setSuccess('Task updated successfully.');
            setEditingTaskId(null);
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
            });

            const tasksResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/user-tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTasks(tasksResponse.data.User_own_Tasks);
        }
        catch (err) {
            console.error(err);
            setError('Failed to update task.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            console.log(taskId);
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/delete-task/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess('Task deleted successfully.');

            const tasksResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/tasks/user-tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasksResponse.data.User_own_Tasks);
        }
        catch (err) {
            console.error(err);
            setError('Failed to delete task.');
        }
    };

    return (
        <div className='min-h-screen lg:px-[85px] px-[15px] bg-white flex flex-col pt-[80px]'>

            {success && <p className="text-green-500 px-[15px] my-[4px] bg-green-100 rounded-lg mb-4">{success}</p>}
            <h2 className="text-xl mt-[15px] font-semibold text-gray-800 mb-4">My Tasks</h2>

            <button onClick={toggleMenu} className='bg-green-800 text-white rounded-xl tetx-[16px] mb-[25px] w-[110px] py-[5px]'>
                Create task
            </button>

            {/* new creatoion form editingTaskId */}
            {isOpen &&
                <section>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={newTask.description}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={newTask.dueDate}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#072f63] text-white px-4 py-2 rounded hover:bg-[#396fb6]">
                            {editingTaskId ? 'Update Task' : 'Create Task'}
                        </button>
                    </form>
                </section>
            }


            {error ?
                <p className="text-blue-500 px-[15px] py-[4px] bg-blue-50 rounded-md mb-4">{error}</p>
                :
                <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Tasks</h3>
                    <div className='overflow-y-auto w-full'>
                        <table className="bg-white w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-600">Title</th>
                                    <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-600">Description</th>
                                    <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-600">Due Date</th>
                                    <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-100">
                                        <td className="py-2 whitespace-nowrap font-[700] px-4 border-b border-gray-300">{task.title}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{task.description}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{task.dueDate}</td>

                                        <td className="py-2 whitespace-nowrap px-4 border-b border-gray-300">
                                            <button
                                                onClick={() => handleEditTask(task)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            }

            {isEditOpen &&
                <form onSubmit={handleUpdateTask} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={newTask.status}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Priority</label>
                        <select
                            name="priority"
                            value={newTask.priority}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={newTask.dueDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Assign To</label>
                        <select
                            name="assignedTo"
                            value={newTask.assignedTo}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#072f63] text-white px-4 py-2 rounded hover:bg-[#396fb6]">
                        {editingTaskId ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            }



            {/*<h3 className="text-lg font-semibold text-gray-700 mt-6">{editingTaskId ? 'Edit Task' : 'Create New Task'}</h3>
      <form onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Priority</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Assign To</label>
          <select
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#072f63] text-white px-4 py-2 rounded hover:bg-[#396fb6]">
          {editingTaskId ? 'Update Task' : 'Create Task'}
        </button>
      </form>
      */}
        </div>
    );
};

export default Home;

/*
<form onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#072f63] text-white px-4 py-2 rounded hover:bg-[#396fb6]">
                    {editingTaskId ? 'Update Task' : 'Create Task'}
                </button>
            </form>
*/
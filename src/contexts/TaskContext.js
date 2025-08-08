
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

const TASKS_STORAGE_KEY = 'TASKS';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks.", error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error("Failed to save tasks.", error);
    }
  };

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now().toString(), completed: false };
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  const updateTask = (updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(newTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        toggleTaskCompletion,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

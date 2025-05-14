"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task, FilterType } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: FilterType;
  isLoading: boolean;
  addTask: (title: string, description: string) => void;
  editTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext deve ser usado em um TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks).map((task: Task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(parsedTasks);
        } catch (error) {
          console.error("Erro ao carregar tarefas do localStorage:", error);
        }
      }
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title, description, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    return filter === "completed"
      ? task.completed
      : filter === "pending"
      ? !task.completed
      : true;
  });

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    filter,
    isLoading,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    setFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

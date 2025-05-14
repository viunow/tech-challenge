"use client";

import { useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTaskContext } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import LoadingSpinner from "./LoadingSpinner";
import { Task } from "@/types/task";

export default function TaskList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { filteredTasks, isLoading } = useTaskContext();

  const handleOpenForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" className="py-0">
        <Box className="mb-6">
          <Typography variant="h4" component="h1" className="text-center mb-2">
            Minhas Tarefas
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className="text-center"
          >
            Organize suas tarefas e mantenha-se produtivo
          </Typography>
        </Box>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="mb-6">
        <Typography variant="h4" component="h1" className="text-center mb-2">
          Minhas Tarefas
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-center"
        >
          Organize suas tarefas e mantenha-se produtivo
        </Typography>
      </Box>

      <TaskFilter />

      <Box className="">
        {filteredTasks.length === 0 ? (
          <Box className="text-center py-12">
            <Typography variant="h6" color="text.secondary">
              Nenhuma tarefa encontrada
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-2">
              Comece criando sua primeira tarefa!
            </Typography>
          </Box>
        ) : (
          <Box>
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </Box>
        )}
      </Box>

      <div className="w-full">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenForm}
        >
          <span className="py-1">Adicionar Tarefa</span>
        </Button>
      </div>

      <TaskForm
        open={isFormOpen}
        onClose={handleCloseForm}
        editingTask={editingTask}
      />
    </Container>
  );
}

"use client";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Box,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useTaskContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskContext();

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      deleteTask(task.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className={`mb-3 ${task.completed ? "opacity-75" : ""}`}>
      <CardContent className="px-4 py-3 transition-colors duration-300 border-2 rounded-md hover:border-b-purple">
        <Box className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="mt-1"
          />

          <Box className="flex-1">
            <Typography
              variant="h6"
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </Typography>

            {task.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                className={`mt-1 ${task.completed ? "line-through" : ""}`}
              >
                {task.description}
              </Typography>
            )}

            <Box className="flex items-center justify-between mt-2">
              <Box className="flex items-center gap-2">
                <Chip
                  label={task.completed ? "Concluída" : "Pendente"}
                  size="small"
                  color={task.completed ? "success" : "warning"}
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  Criada em: {formatDate(task.createdAt)}
                </Typography>
              </Box>

              <Box>
                <IconButton
                  size="small"
                  onClick={() => onEdit(task)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Edit fontSize="small" className="hover:text-blue-500" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  className="text-red-600 hover:bg-red-50 ml-1"
                >
                  <Delete
                    fontSize="small"
                    className="transition-colors hover:text-red-600"
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

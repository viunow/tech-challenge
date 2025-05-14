"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useTaskContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  editingTask?: Task | null;
}

export default function TaskForm({
  open,
  onClose,
  editingTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask, editTask } = useTaskContext();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      editTask(editingTask.id, title.trim(), description.trim());
    } else {
      addTask(title.trim(), description.trim());
    }

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {editingTask ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

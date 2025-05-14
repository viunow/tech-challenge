"use client";

import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";
import { useTaskContext } from "@/contexts/TaskContext";
import { FilterType } from "@/types/task";

export default function TaskFilter() {
  const { filter, setFilter, tasks } = useTaskContext();

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: FilterType | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <Box className="mb-6">
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="filtro de tarefas"
        className="w-full"
      >
        <ToggleButton value="all" className="flex-1">
          <Typography variant="body2">Todas ({tasks.length})</Typography>
        </ToggleButton>
        <ToggleButton value="pending" className="flex-1">
          <Typography variant="body2">Pendentes ({pendingCount})</Typography>
        </ToggleButton>
        <ToggleButton value="completed" className="flex-1">
          <Typography variant="body2">Concluídas ({completedCount})</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

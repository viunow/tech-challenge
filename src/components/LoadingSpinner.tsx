import { CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <CircularProgress size={32} sx={{ color: "#634394" }} thickness={4} />
      <p className="text-purple text-lg font-medium">Carregando tarefas...</p>
    </div>
  );
}

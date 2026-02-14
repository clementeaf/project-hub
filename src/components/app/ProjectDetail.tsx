import KanbanBoard from "../kanban/KanbanBoard";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  return <KanbanBoard projectId={projectId} />;
}

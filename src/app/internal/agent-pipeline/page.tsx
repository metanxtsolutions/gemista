import type { Metadata } from "next";
import { AgentPipelineBoard } from "@/components/internal/agent-pipeline-board";

export const metadata: Metadata = {
  title: "Agent Pipeline",
  robots: { index: false, follow: false },
};

export default function AgentPipelinePage() {
  return (
    <div className="container-gem py-10">
      <AgentPipelineBoard />
    </div>
  );
}

import { BentoCard } from "./BentoCard";

interface ProjectCardProps {
  title: string;
  description: string;
  command: string;
  items: Array<{
    name: string;
    description: string;
  }>;
  actionLabel: string;
  glowColor?: "green" | "blue";
}

export function ProjectCard({
  title,
  description,
  command,
  items,
  actionLabel,
  glowColor = "green",
}: ProjectCardProps) {
  const terminalColorClass =
    glowColor === "green" ? "text-emerald-500" : "text-blue-500";

  return (
    <BentoCard
      title={title}
      description={description}
      isTerminal
      glowColor={glowColor}
      content={
        <div className="space-y-4">
          <div className="text-sm text-zinc-400 font-mono space-y-2">
            <div className={terminalColorClass}>{command}</div>
            {items.map((item, index) => (
              <div key={index} className="text-zinc-300">
                • {item.name}
                <span className="text-zinc-500"> - {item.description}</span>
              </div>
            ))}
          </div>
        </div>
      }
      action={{ label: actionLabel }}
    />
  );
}

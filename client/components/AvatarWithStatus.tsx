interface AvatarWithStatusProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "away" | "offline";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
};

const statusColors = {
  online: "bg-emerald-500",
  away: "bg-yellow-500",
  offline: "bg-zinc-500",
};

export function AvatarWithStatus({
  src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Dawid",
  alt = "Avatar",
  size = "lg",
  status = "online",
}: AvatarWithStatusProps) {
  return (
    <div
      className="relative inline-block animate-in-fade"
    >
      {/* Main avatar circle */}
      <div className={`${sizeClasses[size]} relative`}>
        <div
          className="absolute inset-0 rounded-full border-2 border-zinc-700 animate-pulse"
        >
          <img
            src={src}
            alt={alt}
            width={size === "sm" ? 48 : size === "md" ? 80 : 128}
            height={size === "sm" ? 48 : size === "md" ? 80 : 128}
            loading="eager"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Status ring */}
        <div
          className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusColors[status]} rounded-full border-2 border-black`}
        />

        {/* Pulse ring effect for online status */}
        {status === "online" && (
          <div
            className="absolute inset-0 rounded-full border border-emerald-500 animate-pulse-ring"
          />
        )}
      </div>
    </div>
  );
}

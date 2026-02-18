import { motion } from "framer-motion";

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
    <motion.div
      className="relative inline-block"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Main avatar circle */}
      <div className={`${sizeClasses[size]} relative`}>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-zinc-700"
          animate={status === "online" ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full rounded-full object-cover"
          />
        </motion.div>

        {/* Status ring */}
        <motion.div
          className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusColors[status]} rounded-full border-2 border-black`}
          animate={status === "online" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Pulse ring effect for online status */}
        {status === "online" && (
          <motion.div
            className="absolute inset-0 rounded-full border border-emerald-500"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

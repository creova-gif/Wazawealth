import { motion } from "motion/react";

interface Ring {
  percentage: number;
  color: string;
  label?: string;
}

interface ActivityRingsProps {
  rings: Ring[];
  size?: number;
}

export function ActivityRings({ rings, size = 200 }: ActivityRingsProps) {
  const strokeWidth = 14;
  const gap = 8;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {rings.map((ring, index) => {
          const radius = (size / 2) - (strokeWidth / 2) - (index * (strokeWidth + gap));
          const circumference = radius * 2 * Math.PI;
          const offset = circumference - (ring.percentage / 100) * circumference;

          return (
            <motion.circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={ring.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

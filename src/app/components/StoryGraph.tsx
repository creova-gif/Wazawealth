import { motion } from 'motion/react';
import { useMemo } from 'react';

interface DataPoint {
  date: string;
  value: number;
  projectedLow?: number;
  projectedHigh?: number;
}

interface Props {
  data: DataPoint[];
  height?: number;
  showProjection?: boolean;
  showConfidenceBands?: boolean;
  color?: string;
  title?: string;
  subtitle?: string;
  minimal?: boolean;
}

export function StoryGraph({
  data,
  height = 200,
  showProjection = false,
  showConfidenceBands = false,
  color = 'black',
  title,
  subtitle,
  minimal = false
}: Props) {
  const { path, projectionPath, confidencePath, minValue, maxValue, range } = useMemo(() => {
    if (!data || data.length === 0) {
      return { path: '', projectionPath: '', confidencePath: '', minValue: 0, maxValue: 0, range: 0 };
    }

    const allValues = data.flatMap(d => [
      d.value,
      d.projectedLow || d.value,
      d.projectedHigh || d.value
    ]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue || 1;
    const padding = range * 0.1;

    const width = 100; // percentage
    const stepX = width / (data.length - 1 || 1);

    // Main line path
    const mainPath = data
      .map((point, i) => {
        const x = i * stepX;
        const y = height - ((point.value - minValue + padding) / (range + 2 * padding)) * height;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    // Projection path (if applicable)
    const projectionData = data.filter(d => d.projectedHigh);
    const projectionPath = projectionData.length > 0
      ? projectionData
          .map((point, i) => {
            const actualIndex = data.indexOf(point);
            const x = actualIndex * stepX;
            const y = height - ((point.value - minValue + padding) / (range + 2 * padding)) * height;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ')
      : '';

    // Confidence band path
    let confidencePath = '';
    if (showConfidenceBands && projectionData.length > 0) {
      const upperPath = projectionData
        .map((point, i) => {
          const actualIndex = data.indexOf(point);
          const x = actualIndex * stepX;
          const y = height - ((point.projectedHigh! - minValue + padding) / (range + 2 * padding)) * height;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');

      const lowerPath = projectionData
        .slice()
        .reverse()
        .map((point) => {
          const actualIndex = data.indexOf(point);
          const x = actualIndex * stepX;
          const y = height - ((point.projectedLow! - minValue + padding) / (range + 2 * padding)) * height;
          return `L ${x} ${y}`;
        })
        .join(' ');

      confidencePath = `${upperPath} ${lowerPath} Z`;
    }

    return { path: mainPath, projectionPath, confidencePath, minValue, maxValue, range };
  }, [data, height, showConfidenceBands]);

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="w-full">
      {!minimal && title && (
        <div className="mb-6">
          <h3 className="text-2xl font-light mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
        </div>
      )}

      {/* Value Labels */}
      {!minimal && (
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xs text-zinc-400">Current</p>
            <p className="text-2xl font-light">
              TZS {formatValue(data[data.length - 1]?.value || 0)}
            </p>
          </div>
          {showProjection && data.some(d => d.projectedHigh) && (
            <div className="text-right">
              <p className="text-xs text-zinc-400">Projected</p>
              <p className="text-lg font-light text-zinc-600">
                {formatValue(data[data.length - 1]?.projectedHigh || 0)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Graph */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Confidence Band */}
          {showConfidenceBands && confidencePath && (
            <motion.path
              d={confidencePath}
              fill="currentColor"
              className="text-zinc-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}

          {/* Main Line */}
          <motion.path
            d={path}
            stroke="currentColor"
            strokeWidth={minimal ? "0.8" : "0.5"}
            fill="none"
            className={`text-${color}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: minimal ? 1 : 1.5, ease: 'easeInOut' }}
          />

          {/* Projection Line */}
          {showProjection && projectionPath && (
            <motion.path
              d={projectionPath}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              fill="none"
              className="text-zinc-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            />
          )}
        </svg>

        {/* Gradient Fill */}
        {!minimal && (
          <svg
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="black" stopOpacity="0.05" />
                <stop offset="100%" stopColor="black" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={`${path} L 100 ${height} L 0 ${height} Z`}
              fill="url(#graphGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </svg>
        )}
      </div>

      {/* Time Labels */}
      {!minimal && (
        <div className="flex justify-between mt-2">
          <p className="text-xs text-zinc-400">
            {data[0]?.date || ''}
          </p>
          <p className="text-xs text-zinc-400">
            {data[data.length - 1]?.date || ''}
          </p>
        </div>
      )}
    </div>
  );
}
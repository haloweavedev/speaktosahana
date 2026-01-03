'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/ui';

interface TrendChartProps {
  data: { year: number; count: number }[];
}

export function TrustTrendChart({ data }: TrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    year: number;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Filter out anomalies (e.g., year 1900 or future years if any)
  const validData = data.filter(d => d.year >= 2000 && d.year <= new Date().getFullYear());

  if (validData.length < 2) {
    return (
      <Card className="h-full bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Registration Trend</CardTitle>
          <CardDescription className="text-slate-500">Insufficient data to display trend</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const firstPoint = validData[0];
  const lastPoint = validData[validData.length - 1];

  if (!firstPoint || !lastPoint) return null;

  // Chart dimensions and configuration
  const viewBoxWidth = 500;
  const viewBoxHeight = 250;
  const padding = { top: 30, right: 30, bottom: 30, left: 40 };

  const maxCount = Math.max(...validData.map(d => d.count));
  // Round up max count to nice number for y-axis (e.g. 42 -> 50)
  const yAxisMax = Math.ceil(maxCount / 10) * 10;
  const minCount = 0;

  const minYear = firstPoint.year;
  const maxYear = lastPoint.year;

  const normalizeX = (year: number) => {
    return padding.left + ((year - minYear) / (maxYear - minYear)) * (viewBoxWidth - padding.left - padding.right);
  };

  const normalizeY = (count: number) => {
    // Invert Y because SVG coordinates start from top
    return (viewBoxHeight - padding.bottom) - ((count - minCount) / (yAxisMax - minCount)) * (viewBoxHeight - padding.top - padding.bottom);
  };

  const points = validData.map(d => `${normalizeX(d.year)},${normalizeY(d.count)}`).join(' ');

  // Area path (closed loop for gradient fill)
  const areaPath = `
    M ${normalizeX(minYear)},${viewBoxHeight - padding.bottom}
    L ${points}
    L ${normalizeX(maxYear)},${viewBoxHeight - padding.bottom}
    Z
  `;

  // Line path (stroke)
  const linePath = `M ${points}`;

  return (
    <Card className="h-full border-slate-200 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-display text-slate-900">Ecosystem Growth</CardTitle>
        <CardDescription className="text-slate-500">New disability service providers per year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full aspect-[2/1] relative select-none">
          <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="w-full h-full overflow-visible">
            {/* Grid lines and Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map(t => {
                const value = Math.round(minCount + t * (yAxisMax - minCount));
                const y = normalizeY(value);
                return (
                    <g key={t}>
                        <line
                            x1={padding.left}
                            y1={y}
                            x2={viewBoxWidth - padding.right}
                            y2={y}
                            stroke="#e2e8f0"
                            strokeDasharray="4 4"
                        />
                        <text
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            className="fill-slate-400 text-[12px] font-mono"
                        >
                            {value}
                        </text>
                    </g>
                )
            })}

            {/* Area Fill */}
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
              </linearGradient>
            </defs>

            <motion.path
              d={areaPath}
              fill="url(#trendGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Line Stroke */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Interactive Points */}
            {validData.map((d, i) => (
                <g key={d.year}>
                    {/* Visible Dot */}
                    <motion.circle
                        cx={normalizeX(d.year)}
                        cy={normalizeY(d.count)}
                        r={3}
                        fill="#a855f7"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + (i * 0.05) }}
                    />
                    {/* Invisible Hit Area for better UX */}
                    <circle
                        cx={normalizeX(d.year)}
                        cy={normalizeY(d.count)}
                        r={12}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint({
                            year: d.year,
                            count: d.count,
                            x: normalizeX(d.year),
                            y: normalizeY(d.count)
                        })}
                        onMouseLeave={() => setHoveredPoint(null)}
                    />
                </g>
            ))}
          </svg>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredPoint && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bg-white border border-slate-200 shadow-lg rounded-md px-3 py-1.5 pointer-events-none z-10"
                    style={{
                        left: `${(hoveredPoint.x / viewBoxWidth) * 100}%`,
                        top: `${(hoveredPoint.y / viewBoxHeight) * 100}%`,
                        transform: 'translate(-50%, -130%)'
                    }}
                >
                    <div className="text-xs font-bold font-mono text-slate-900">{hoveredPoint.year}</div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">{hoveredPoint.count} NGOs</div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* X Axis Labels */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-between text-xs font-mono text-slate-400 pointer-events-none">
            <span style={{ marginLeft: `${(padding.left / viewBoxWidth) * 100}%` }}>{minYear}</span>
            <span style={{ marginRight: `${(padding.right / viewBoxWidth) * 100}%` }}>{maxYear}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
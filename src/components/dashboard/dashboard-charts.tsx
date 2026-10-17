"use client";

import { useId } from "react";
import { Activity, Wallet } from "lucide-react";
import type { DashboardPeriod } from "@/lib/dashboard-mock-data";

type AttendancePoint = {
  label: string;
  attendance: number;
};

type FeePoint = {
  label: string;
  collected: number;
};

type DashboardChartsProps = {
  period: DashboardPeriod;
  attendance: AttendancePoint[];
  fees: FeePoint[];
};

function formatTaka(value: number) {
  const amount =
    value >= 100000
      ? `${(value / 100000).toFixed(1)}L`
      : value >= 1000
        ? `${Math.round(value / 1000)}k`
        : value.toLocaleString("en-BD");

  return `৳${amount}`;
}

function AttendanceChart({ data }: { data: AttendancePoint[] }) {
  const chartId = useId();
  const width = 500;
  const height = 220;
  const left = 38;
  const right = 12;
  const top = 18;
  const bottom = 34;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const x = (index: number) =>
    left + (index / Math.max(data.length - 1, 1)) * plotWidth;

  const y = (value: number) => top + ((100 - value) / 100) * plotHeight;

  const points = data
    .map((point, index) => `${x(index)},${y(point.attendance)}`)
    .join(" ");

  const areaPath = [
    `M ${x(0)} ${top + plotHeight}`,
    ...data.map((point, index) => `L ${x(index)} ${y(point.attendance)}`),
    `L ${x(data.length - 1)} ${top + plotHeight}`,
    "Z",
  ].join(" ");

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            {data.length
              ? `${(
                  data.reduce((sum, point) => sum + point.attendance, 0) /
                  data.length
                ).toFixed(1)}%`
              : "—"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Average for selected period
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" />
          Attendance
        </div>
      </div>

      <div className="mt-4 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${chartId}-title ${chartId}-description`}
          className="h-auto w-full overflow-visible"
        >
          <title id={`${chartId}-title`}>Attendance trend</title>
          <desc id={`${chartId}-description`}>
            Attendance percentages across the selected period.{" "}
            {data
              .map((point) => `${point.label}: ${point.attendance}%`)
              .join("; ")}
          </desc>

          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                x1={left}
                y1={y(tick)}
                x2={width - right}
                y2={y(tick)}
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeDasharray="3 5"
              />
              <text
                x={left - 8}
                y={y(tick) + 4}
                textAnchor="end"
                fontSize="10"
                fill="currentColor"
                opacity="0.65"
              >
                {tick}%
              </text>
            </g>
          ))}

          <defs>
            <linearGradient id={`${chartId}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.01"
              />
            </linearGradient>
          </defs>

          <path d={areaPath} fill={`url(#${chartId}-fill)`} />

          <polyline
            points={points}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />

          {data.map((point, index) => (
            <circle
              key={point.label}
              cx={x(index)}
              cy={y(point.attendance)}
              r="3.5"
              fill="var(--primary)"
              stroke="var(--card)"
              strokeWidth="2"
            />
          ))}

          {data.map((point, index) => (
            <text
              key={point.label}
              x={x(index)}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              opacity="0.7"
            >
              {point.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function FeeCollectionChart({ data }: { data: FeePoint[] }) {
  //   const chartId = useId();
  const maxValue = Math.max(...data.map((point) => point.collected), 1);
  //   const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            {formatTaka(data.reduce((sum, point) => sum + point.collected, 0))}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total in selected chart period
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-violet-500" />
          Collected
        </div>
      </div>

      <div
        className="mt-4 space-y-3"
        role="img"
        aria-label={`Fee collection bar chart. ${data.map((point) => `${point.label}: ${formatTaka(point.collected)}`).join("; ")}`}
      >
        {data.map((point, index) => (
          <div
            key={index}
            className="grid grid-cols-[52px_minmax(0,1fr)_62px] items-center gap-2"
          >
            <span className="truncate text-xs text-muted-foreground">
              {point.label}
            </span>

            <div className="h-7 overflow-hidden rounded-md bg-muted">
              <div
                className="fee-bar-animated h-full rounded-md bg-violet-500/85"
                style={
                  {
                    "--fee-bar-width": `${(point.collected / maxValue) * 100}%`,
                    width: `${(point.collected / maxValue) * 100}%`,
                    animationDelay: `${index * 35}ms`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
            </div>

            <span className="text-right text-xs font-medium tabular-nums">
              {formatTaka(point.collected)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
        <span>৳0</span>
        <span>{formatTaka(maxValue / 2)}</span>
        <span>{formatTaka(maxValue)}</span>
      </div>
    </div>
  );
}

export function DashboardCharts({
  period,
  attendance,
  fees,
}: DashboardChartsProps) {
  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-2">
      <section className="min-w-0 rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold">Attendance overview</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Daily attendance performance
            </p>
          </div>
        </div>

        <AttendanceChart data={attendance} />
      </section>

      <section className="min-w-0 rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Wallet className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold">Fee collection</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Collection by day or period
            </p>
          </div>
        </div>

        <FeeCollectionChart data={fees} />
      </section>
    </div>
  );
}

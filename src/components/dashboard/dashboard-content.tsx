"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Plus,
  Receipt,
  Sparkles,
  Wallet,
  Users,
} from "lucide-react";
import {
  attendanceData,
  dashboardMetrics,
  feeCollectionData,
  recentActivities,
  type DashboardPeriod,
} from "@/lib/dashboard-mock-data";
import { DashboardCharts } from "./dashboard-charts";

const periodOptions: { label: string; value: DashboardPeriod }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

// const money = (amount: number) =>
//   new Intl.NumberFormat("en-BD", {
//     style: "currency",
//     currency: "BDT",
//     maximumFractionDigits: 0,
//   }).format(amount);

const compactMoney = (amount: number) =>
  amount >= 100000
    ? `৳${(amount / 100000).toFixed(1)}L`
    : `৳${Math.round(amount / 1000)}k`;

const metrics = [
  {
    title: "Total students",
    value: dashboardMetrics.totalStudents.toLocaleString("en-BD"),
    description: "Currently enrolled",
    icon: GraduationCap,
    tone: "teal",
    href: "/students",
  },
  {
    title: "Attendance today",
    value: `${dashboardMetrics.attendanceToday}%`,
    description: `${dashboardMetrics.presentToday.toLocaleString("en-BD")} present`,
    icon: CalendarCheck,
    tone: "blue",
    href: null,
  },
  {
    title: "Fees collected",
    value: compactMoney(dashboardMetrics.feesCollected),
    description: "Illustrative monthly total",
    icon: Wallet,
    tone: "violet",
    href: null,
  },
  {
    title: "Outstanding fees",
    value: compactMoney(dashboardMetrics.outstandingFees),
    description: "Illustrative pending balance",
    icon: Receipt,
    tone: "amber",
    href: null,
  },
];

const priorities = [
  {
    title: "Review attendance",
    detail: "Check classes with incomplete attendance",
    icon: CalendarCheck,
    href: null,
  },
  {
    title: "Follow up on fees",
    detail: "Review outstanding student balances",
    icon: Wallet,
    href: null,
  },
  {
    title: "Prepare upcoming exams",
    detail: "Review the examination schedule",
    icon: BookOpen,
    href: null,
  },
];

const quickActions = [
  { label: "Add student", icon: Plus, href: "/students" },
  { label: "View students", icon: Users, href: "/students" },
  { label: "View dashboard", icon: CalendarDays, href: "/dashboard" },
];

const activityIcons = {
  admission: GraduationCap,
  payment: Wallet,
  attendance: CalendarCheck,
  exam: BookOpen,
};

export function DashboardContent() {
  const [period, setPeriod] = useState<DashboardPeriod>("30d");

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
      <section className="dashboard-enter relative isolate overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/15 via-card to-card p-5 shadow-sm sm:p-7 lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-20 -z-10 size-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 size-48 rounded-full bg-cyan-400/10 blur-3xl"
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Your institution at a glance
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, Admin
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Keep track of academic performance and financial health from one
              workspace.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border/70 bg-background/75 p-3 shadow-sm backdrop-blur">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dashboard data</p>
              <p className="text-sm font-semibold">Demo preview</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Institution metrics">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Institution overview
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Key numbers at a glance.
            </p>
          </div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Demo data
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const content = (
              <div
                className="dashboard-enter group h-full rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      {metric.value.startsWith("৳") ? (
                        <>
                          <span className="mr-1 text-[0.8em]">৳</span>
                          {metric.value.slice(1)}
                        </>
                      ) : (
                        metric.value
                      )}
                    </p>
                  </div>
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                      metric.tone === "teal"
                        ? "bg-primary/10 text-primary"
                        : metric.tone === "blue"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : metric.tone === "violet"
                            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                  {metric.href && (
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </div>
              </div>
            );

            return metric.href ? (
              <Link
                key={metric.title}
                href={metric.href}
                className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {content}
              </Link>
            ) : (
              <div key={metric.title}>{content}</div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Performance analytics
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore attendance and collection trends separately.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <span className="font-medium text-muted-foreground">Period</span>
            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as DashboardPeriod)
              }
              className="h-10 min-w-36 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <DashboardCharts
          period={period}
          attendance={attendanceData[period]}
          fees={feeCollectionData[period]}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold tracking-tight">
                Today&apos;s priorities
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Suggested actions for your team.
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BellRing className="size-5" />
            </div>
          </div>

          <div className="mt-5 divide-y divide-border">
            {priorities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    Preview
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="font-semibold tracking-tight">Quick actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump into your workspace.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex min-h-20 items-center gap-3 rounded-xl border border-border/80 p-3 transition-all hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {action.label}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>

          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Student registration and payment workflows are not implemented yet.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold tracking-tight">Recent activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Example events from an institution&apos;s daily workflow.
            </p>
          </div>
          <Clock3 className="size-5 text-muted-foreground" />
        </div>

        <div className="mt-5 divide-y divide-border">
          {recentActivities.map((activity) => {
            const Icon =
              activityIcons[activity.type as keyof typeof activityIcons] ??
              CheckCircle2;

            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <time className="shrink-0 text-right text-xs text-muted-foreground">
                  {activity.time}
                </time>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        SMS dashboard preview · All displayed records are illustrative demo
        data.
      </p>
    </div>
  );
}

export type DashboardPeriod = "7d" | "30d" | "90d";

export const dashboardMetrics = {
  totalStudents: 1284,
  attendanceToday: 92.4,
  presentToday: 1187,
  feesCollected: 480000,
  outstandingFees: 120000,
};

export const attendanceData: Record<
  DashboardPeriod,
  { label: string; attendance: number }[]
> = {
  "7d": [
    { label: "Mon", attendance: 88 },
    { label: "Tue", attendance: 91 },
    { label: "Wed", attendance: 86 },
    { label: "Thu", attendance: 94 },
    { label: "Fri", attendance: 92 },
    { label: "Sat", attendance: 96 },
    { label: "Sun", attendance: 92.4 },
  ],
  "30d": [
    { label: "Week 1", attendance: 88 },
    { label: "Week 2", attendance: 91 },
    { label: "Week 3", attendance: 89 },
    { label: "Week 4", attendance: 92.4 },
  ],
  "90d": [
    { label: "Month 1", attendance: 85 },
    { label: "Month 2", attendance: 89 },
    { label: "Month 3", attendance: 92.4 },
  ],
};

export const feeCollectionData: Record<
  DashboardPeriod,
  { label: string; collected: number }[]
> = {
  "7d": [
    { label: "Mon", collected: 12000 },
    { label: "Tue", collected: 18000 },
    { label: "Wed", collected: 9000 },
    { label: "Thu", collected: 22000 },
    { label: "Fri", collected: 16000 },
    { label: "Sat", collected: 28000 },
    { label: "Sun", collected: 19000 },
  ],
  "30d": [
    { label: "Week 1", collected: 85000 },
    { label: "Week 2", collected: 112000 },
    { label: "Week 3", collected: 96000 },
    { label: "Week 4", collected: 187000 },
  ],
  "90d": [
    { label: "Month 1", collected: 350000 },
    { label: "Month 2", collected: 410000 },
    { label: "Month 3", collected: 480000 },
  ],
};

export const recentActivities = [
  {
    id: 1,
    title: "New student admitted",
    description: "Class 10 · Science",
    time: "10 minutes ago",
    type: "admission",
  },
  {
    id: 2,
    title: "Fee payment recorded",
    description: "Monthly tuition fee · ৳5,000",
    time: "35 minutes ago",
    type: "payment",
  },
  {
    id: 3,
    title: "Attendance submitted",
    description: "Class 9 · Mathematics",
    time: "1 hour ago",
    type: "attendance",
  },
  {
    id: 4,
    title: "Exam results published",
    description: "Monthly assessment",
    time: "3 hours ago",
    type: "exam",
  },
] as const;

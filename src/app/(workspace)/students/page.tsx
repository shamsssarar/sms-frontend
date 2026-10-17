import { GraduationCap } from "lucide-react";

export default function StudentsPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCap className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage student records and enrollment.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold">Student management</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page is a placeholder. Student registration, records, search, and
          enrollment features will be added later.
        </p>
      </div>
    </section>
  );
}

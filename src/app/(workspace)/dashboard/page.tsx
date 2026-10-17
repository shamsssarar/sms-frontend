import { GraduationCap } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <GraduationCap className="size-8" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Welcome to SMS
      </h1>

      <p className="mt-3 max-w-xl text-muted-foreground">
        Your education management workspace. We are building the foundation for
        managing your institution&apos;s academic and administrative operations.
      </p>

      <div className="mt-8 w-full rounded-xl border border-border bg-card p-6 text-left">
        <h2 className="font-semibold">Your workspace starts here</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The application shell is ready for the next phase. Dashboard data and
          individual feature pages will be implemented when their requirements
          are defined.
        </p>
      </div>
    </section>
  );
}

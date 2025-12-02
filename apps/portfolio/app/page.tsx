import { Button } from "@repo/ui";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Sahana&apos;s Portfolio</h1>
      <p className="text-gray-500">Building things.</p>
      <Button>Contact Me</Button>
    </div>
  );
}

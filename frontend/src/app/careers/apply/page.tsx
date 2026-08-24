import { Metadata } from "next";
import { Suspense } from "react";
import ApplyPageClient from "./ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply for a Position",
  description: "Submit your application to join AlMnaber Consulting Professional Co. team.",
};

export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyPageClient />
    </Suspense>
  );
}

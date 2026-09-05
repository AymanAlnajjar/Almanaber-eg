import { Metadata } from "next";
import CareerDetailsClient from "./CareerDetailsClient";

export const metadata: Metadata = {
  title: "Career Opportunity",
  description: "View job details and apply for a position at AlMnaber Consulting Professional Co.",
};

export default async function CareerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CareerDetailsClient jobId={id} />;
}
